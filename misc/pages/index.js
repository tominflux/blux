const path = require("path")
const fs = require("fs-extra")
const { getConfig } = require("../config")

const getPageDirectory = () => (
    path.join(
        getConfig().staticPath, "content/page"
    )
)

async function discoverPages(onlyPublic=false, relativeDirectory="") {
    const jsonFilter = /\.json$/
    const absDirectory = path.join(
        getPageDirectory(), relativeDirectory
    )
    let accumulatedFileIds = []
    const immediateFilePaths = await fs.readdir(absDirectory)
    for (const fileName of immediateFilePaths) {
        const filePath = path.join(absDirectory, fileName)
        const stat = await fs.lstat(filePath)
        if (stat.isDirectory()) {
            const nextDirectory = path.join(relativeDirectory, fileName)
            const nextPageFilePaths = await discoverPages(onlyPublic, nextDirectory)
            accumulatedFileIds = [
                ...accumulatedFileIds,
                ...nextPageFilePaths
            ]
        } else if (jsonFilter.test(filePath)) {
            const relativeFilePath = path.join(relativeDirectory, fileName)
            const fileId = relativeFilePath.replace(".json", "")
            if (onlyPublic) {
                const pageData = await fs.readFile(filePath)
                const pageJson = pageData.toString()
                const page = JSON.parse(pageJson)
                const isPublic = (!page.isDraft)
                console.log(page)
                console.log("isPublic: " + isPublic)
                if (isPublic) {
                    accumulatedFileIds.push(fileId)
                }
            } else {
                accumulatedFileIds.push(fileId)
            }
        }
    }
    return accumulatedFileIds
}

const pageIdToFilepath = pageId => path.join(
    getPageDirectory(), pageId + ".json"
)

async function readPages(pageIds) {
    const pages = []
    for (const pageId of pageIds) {
        const pagePath = pageIdToFilepath(pageId)
        const fileContent = await fs.readFile(pagePath)
        const textContent = fileContent.toString()
        try {
            const objContent = JSON.parse(textContent)
            const page = {
                ...objContent,
                id: pageId,
            }
            pages.push(page)
        } catch (err) {
            throw new Error(
                `Could not parse page. \n ` + 
                `${err}\n` + 
                `${textContent}`
            )
        }
    }
    return pages
}

exports.discoverPages = discoverPages
exports.readPages = readPages