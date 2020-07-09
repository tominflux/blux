const path = require("path")
const fs = require("fs-extra")
const { getConfig } = require("../../../misc/config")
const { HTTP_METHOD, configureAuthApi } = require("../auth")
const {
    slugify,
    slugifyFilename,
    slugifyFilepath
} = require("../../../misc/slugify")

const API_PATH = /\/api\/page-browser\/?(.*)/

const getPageRoot = () => (
    path.join(
        getConfig().staticPath, "content/page"
    )
)

const getAbsPath = pagePath => path.join(getPageRoot(), pagePath)
const getPagePath = absPath => path.relative(getPageRoot(), absPath)

const checkIfFolder = async absPath => {
    const stat = await fs.lstat(absPath)
    return stat.isDirectory()
}

const getPageId = (pagePath, pageName) => (
    (pagePath === "" || pagePath === "/") ?
        pageName : path.join(pagePath, pageName)
)

const getPageType = async (absPath) => {
    const pageData = await fs.readFile(absPath)
    const pageString = pageData.toString()
    const pageObj = JSON.parse(pageString)
    return pageObj.type
}

/////////
/////////


async function createNewFolder(pagePath, count=0) {
    const suffix = (count > 0) ? `-${count}` : ""
    const name = `new-folder${suffix}` 
    const absPath = getAbsPath(pagePath)
    const newFolderAbsPath = path.join(absPath, name)
    const exists = await fs.exists(newFolderAbsPath)
    if (exists) {
        return createNewFolder(mediaPath, count + 1)
    } else {
        await fs.mkdir(newFolderAbsPath)
        return name
    }
}

async function readFolder(pagePath) {
    const absPath = getAbsPath(pagePath)
    const fileNames = await fs.readdir(absPath)
    const listings = []
    for (const fileName of fileNames) {
        const filePath = path.join(absPath, fileName)
        const filePagePath = getPagePath(filePath)
        const isFolder = await checkIfFolder(filePath)
        const name = fileName.replace(".json", "")
        const id = getPageId(pagePath, name)
        const type = (isFolder ? null : await getPageType(filePath))
        const fileInfo = {
            isFolder,
            path: filePagePath,
            name,
            type
        }
        listings.push(
            isFolder ? fileInfo : { ...fileInfo, id }
        )
    }
    return listings
} 

async function readFile(pagePath) {
    const absPath = getAbsPath(pagePath)
    const fileName = path.basename(absPath)
    const name = fileName.replace(".json", "")
    const id = getPageId(pagePath, name)
    const type = (isFolder ? null : await getPageType(absPath))
    return {
        path: pagePath,
        name,
        id,
        type
    }
}

async function renamePageOrFolder(pagePath, newPath) {
    const absPathFolder = getAbsPath(pagePath)
    const absPathPage = absPathFolder + ".json"
    const existsFolder = await fs.exists(absPathFolder)
    const existsFile = await fs.exists(absPathPage)
    if (!existsFolder && !existsFile) {
        throw new Error(
            "Specified page or folder does not exist. " +
            pagePath
        )
    }
    const isFolder = existsFolder
    const absPath = isFolder ? absPathFolder : absPathPage
    const newAbsPath = getAbsPath(newPath) + (
        isFolder ? "" : ".json"
    )
    const newExists = await fs.exists(newAbsPath)
    if (newExists) {
        throw new Error(
            "Page or folder at new path already exists. " +
            newPath
        )
    }
    const extensionsMatch = (
        path.extname(absPath) === path.extname(newAbsPath)
    )
    if (!extensionsMatch) {
        throw new Error(
            "Cannot change file extension." + 
            `Old: ${path.extname(absPath)} ` +
            `New: ${path.extname(newAbsPath)}` 
        )
    }
    const slugifiedPath = slugifyFilepath(newAbsPath)
    await fs.rename(absPath, slugifiedPath)
}

async function deletePage(pagePath) {
    const absPath = getAbsPath(pagePath) + ".json"
    const exists = await fs.exists(absPath)
    if (!exists) {
        throw new Error(
            `Specified page does not exist. [path=${pagePath}]`
        )
    }
    await fs.remove(absPath)
}

async function deleteFolder(pagePath) {
    const absPath = getAbsPath(pagePath)
    const exists = await fs.exists(absPath)
    if (!exists) {
        throw new Error(
            `Specified folder does not exist. [path=${pagePath}]`
        )
    }
    await fs.remove(absPath)
}


async function deletePageOrFolder(pagePath, isFolder) {
    if (isFolder) {
        await deleteFolder(pagePath)
    } else {
        await deletePage(pagePath)
    }
}

/////////
/////////

async function createHandler(req, res, next) {
    const pagePath = req.params[0]
    try {
        const responseBody = await createNewFolder(pagePath)
        res.send(responseBody)
    } catch (err) {
        next(err)
    }
}

async function readHandler(req, res) {
    const pagePath = req.params[0]
    const absPath = getAbsPath(pagePath)
    const isFolder = await checkIfFolder(absPath)
    const response = {
        isFolder, 
        contents:
            isFolder ? 
                await readFolder(pagePath) : 
                await readFile(pagePath)
    }
    res.send(response)
}

async function updateHandler(req, res, next) {
    const pagePath = req.params[0]
    const newPath = req.body.newPath
    try {
        await renamePageOrFolder(pagePath, newPath)
        res.send()
    } catch (err) {
        next(err)
        return
    }
}


async function deleteHandler(req, res, next) {
    const pagePath = req.params[0]
    const isFolder = req.body.isFolder
    try {
        await deletePageOrFolder(pagePath, isFolder)
        res.send(pagePath)
    } catch (err) {
        next(err)
    }
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
