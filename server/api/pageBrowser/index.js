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
        const fileInfo = {
            isFolder,
            path: filePagePath,
            name
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
    return {
        path: pagePath,
        name,
        id
    }
}

async function renamePageOrFolder(pagePath, newPath) {
    const absPath = getAbsPath(pagePath)
    const newAbsPath = getAbsPath(newPath)
    const exists = await fs.exists(newAbsPath)
    if (exists) {
        throw new Error(
            "File at new path already exists.",
            pagePath
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

async function updateHandler(req, res) {
    const pagePath = req.params[0]
    const newPath = req.body.newPath
    try {
        await renamePageOrFolder(pagePath, newPath)
    } catch (err) {
        next(err)
        return
    }
}


/////////
/////////


function configure(expressApp) {
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
}


/////////
/////////


exports.configure = configure
