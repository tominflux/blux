const path = require("path")
const fs = require("fs-extra")
const { getConfig } = require("../../../misc/config")
const { HTTP_METHOD, configureAuthApi } = require("../auth")
const {
    slugify,
    slugifyFilename,
    slugifyFilepath
} = require("../../../misc/slugify")

const API_PATH = /\/api\/media\/?(.*)/
const getMediaRoot = () => (
    path.join(
        getConfig().staticPath, "content/media"
    )
)

const getAbsPath = mediaPath => path.join(getMediaRoot(), mediaPath)
const getMediaPath = absPath => path.relative(getMediaRoot(), absPath)



////////
////////


const checkIfFolder = async absPath => {
    const stat = await fs.lstat(absPath)
    return stat.isDirectory()
}

async function writeFile(mediaPath, file) {
    const absPath = getAbsPath(mediaPath)
    const parentFolder = path.dirname(absPath)
    const parentExists = await fs.exists(parentFolder)
    if (!parentExists) {
        await fs.mkdir(parentFolder, {recursive: true})
    }
    file.mv(absPath)
}

async function readFolder(mediaPath) {
    const absPath = getAbsPath(mediaPath)
    const fileNames = await fs.readdir(absPath)
    const listings = []
    for (const fileName of fileNames) {
        const filePath = path.join(absPath, fileName)
        const fileMediaPath = getMediaPath(filePath)
        const isFolder = await checkIfFolder(filePath)
        const fileInfo = {
            isFolder,
            path: fileMediaPath,
            name: fileName
        }
        listings.push(fileInfo)
    }
    return listings
} 


async function readFile(mediaPath) {
    const absPath = getAbsPath(mediaPath)
    const fileName = path.basename(absPath)
    return {
        path: mediaPath,
        name: fileName
    }
}

async function deleteFileOrFolder(mediaPath) {
    const absPath = getAbsPath(mediaPath)
    fs.remove(absPath)
}

async function handleFileUpload(reqFiles, mediaPath) {
    if (!reqFiles.media) {
        throw new Error(
            "No media file supplied."
        )
    }
    const file = reqFiles.media
    const slugifiedPath = slugifyFilepath(mediaPath)
    const absPath = getAbsPath(slugifiedPath)
    const exists = await fs.exists(absPath)
    if (exists) {
        throw new Error(
            "File at given path already exists.",
            mediaPath
        )
    }
    await writeFile(slugifiedPath, file)
    return {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
    }
}

async function createNewFolder(mediaPath, count=0) {
    const suffix = (count > 0) ? `-${count}` : ""
    const name = `new-folder${suffix}` 
    const absPath = getAbsPath(mediaPath)
    const newFolderAbsPath = path.join(absPath, name)
    const exists = await fs.exists(newFolderAbsPath)
    if (exists) {
        return createNewFolder(mediaPath, count + 1)
    } else {
        await fs.mkdir(newFolderAbsPath)
        return name
    }
}

async function renameFileOrFolder(mediaPath, newPath) {
    const absPath = getAbsPath(mediaPath)
    if (!newPath) {
        throw new Error(
            "No new path specified."
        )
    }
    const newAbsPath = getAbsPath(newPath)
    const exists = await fs.exists(newAbsPath)
    if (exists) {
        throw new Error(
            "File at new path already exists.",
            mediaPath
        )
    }
    const extensionsMatch = (
        path.extname(absPath) === path.extname(newAbsPath)
    )
    if (!extensionsMatch) {
        throw new Error(
            "Cannot change file extension."
        )
    }
    const slugifiedPath = slugifyFilepath(newAbsPath)
    await fs.rename(absPath, slugifiedPath)
}
/////////
/////////


async function createHandler(req, res, next) {
    const mediaPath = req.params[0]
    if (req.files) {
        try {
            const responseBody = await handleFileUpload(req.files, mediaPath)
            res.send(responseBody)
        } catch (err) {
            next(err)
        }
    } else {
        try {
            const responseBody = await createNewFolder(mediaPath)
            res.send(responseBody)
        } catch (err) {
            next(err)
        }
    }
}


async function readHandler(req, res) {
    const mediaPath = req.params[0]
    const absPath = getAbsPath(mediaPath)
    const isFolder = await checkIfFolder(absPath)
    const response = {
        isFolder, 
        contents:
            isFolder ? 
                await readFolder(mediaPath) : 
                await readFile(mediaPath)
    }
    res.send(response)
}

async function updateHandler(req, res, next) {
    const mediaPath = req.params[0]
    const newPath = req.body.newPath
    try {
        await renameFileOrFolder(mediaPath, newPath)
    } catch (err) {
        next(err)
        return
    }
    res.send(newPath)
}

async function deleteHandler(req, res) {
    const mediaPath = req.params[0]
    deleteFileOrFolder(mediaPath)
    res.send(mediaPath)
}


/////////
/////////


function configure(expressApp) {
    configureAuthApi(
        expressApp,
        HTTP_METHOD.POST,
        API_PATH,
        createHandler
    )
    configureAuthApi(
        expressApp,
        HTTP_METHOD.GET,
        API_PATH,
        readHandler
    )
    configureAuthApi(
        expressApp,
        HTTP_METHOD.PUT,
        API_PATH,
        updateHandler
    )
    configureAuthApi(
        expressApp,
        HTTP_METHOD.DELETE,
        API_PATH,
        deleteHandler
    )
}


/////////
/////////


exports.configure = configure
