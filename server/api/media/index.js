const path = require("path")
const fs = require("fs-extra")

const API_PATH = /\/api\/media\/?(.*)/
const MEDIA_ROOT = "./static/content/media"

const getAbsPath = mediaPath => path.join(MEDIA_ROOT, mediaPath)
const getMediaPath = absPath => path.relative(MEDIA_ROOT, absPath)


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

/////////
/////////


async function createHandler(req, res, next) {
    const mediaPath = req.params[0]
    const absPath = getAbsPath(mediaPath)
    const exists = await fs.exists(absPath)
    if (exists) {
        const err = new Error(
            "File at given path already exists.",
            mediaPath
        )
        console.error(err)
        next(err)
        return
    }
    if (!req.files) {
        const err = new Error(
            "No file uploaded",
            mediaPath
        )
        console.error(err)
        next(err)
        return
    }
    const file = req.files.media
    await writeFile(mediaPath, file)
    res.send({
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
    })
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

async function deleteHandler(req, res) {
    const mediaPath = req.params[0]
    deleteFileOrFolder(mediaPath)
    res.send(mediaPath)
}


/////////
/////////


function configure(expressApp) {
    expressApp.post(API_PATH, createHandler)
    expressApp.get(API_PATH, readHandler)
    expressApp.delete(API_PATH, deleteHandler)
}


/////////
/////////


exports.configure = configure
