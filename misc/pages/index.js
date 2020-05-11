const path = require("path")
const fs = require("fs-extra")

const PAGE_DIRECTORY = "./static/content/page"

async function discoverPages(relativeDirectory="") {
    const jsonFilter = /\.json$/
    const absDirectory = path.join(
        PAGE_DIRECTORY, relativeDirectory
    )
    let accumulatedFileIds = []
    const immediateFilePaths = await fs.readdir(absDirectory)
    for (const fileName of immediateFilePaths) {
        const filePath = path.join(absDirectory, fileName)
        const stat = await fs.lstat(filePath)
        if (stat.isDirectory()) {
            const nextDirectory = path.join(relativeDirectory, fileName)
            const nextPageFilePaths = await discoverPages(nextDirectory)
            accumulatedFileIds = [
                ...accumulatedFileIds,
                ...nextPageFilePaths
            ]
        } else if (jsonFilter.test(filePath)) {
            const relativeFilePath = path.join(relativeDirectory, fileName)
            const fileId = relativeFilePath.replace(".json", "")
            accumulatedFileIds.push(fileId)
        }
    }
    return accumulatedFileIds
}

const pageIdToFilepath = pageId => path.join(
    PAGE_DIRECTORY, pageId + ".json"
)

async function readPages(pageIds) {
    const pages = []
    for (const pageId of pageIds) {
        const pagePath = pageIdToFilepath(pageId)
        const fileContent = await fs.readFile(pagePath)
        const textContent = fileContent.toString()
        const objContent = JSON.parse(textContent)
        const page = {
            ...objContent,
            id: pageId,
        }
        pages.push(page)
    }
    return pages
}

exports.discoverPages = discoverPages
exports.readPages = readPages