const path = require("path")
const fs = require("fs-extra")

const API_PATH = /\/api\/page-browser\/?(.*)/
const PAGE_ROOT = "./static/content/page"

const getAbsPath = pagePath => path.join(PAGE_ROOT, pagePath)
const getPagePath = absPath => path.relative(PAGE_ROOT, absPath)

//async function createNewPage(id, )


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


/////////
/////////


function configure(expressApp) {
    expressApp.get(API_PATH, readHandler)
}


/////////
/////////


exports.configure = configure
