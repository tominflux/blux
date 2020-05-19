const fs = require("fs-extra")
const path = require("path")
const discoverPages = require("../../misc/pages").discoverPages
const readPages = require("../../misc/pages").readPages
const { renderRoutesToFiles } = require("../renderRoutes")
const { readConfidentials } = require("../../misc/confidentials")
const { readConfig, getConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo } = require("../../misc/staticRepo")

async function copyPagesJson(pagesData) {
    const destFolder = "public/content/"
    await fs.mkdir(destFolder, { recursive: true })
    await fs.writeFile(
        path.join(destFolder, "/pages.json"),
        JSON.stringify(pagesData)
    )
}

async function ensureStaticRepoCloned() {
    const isCloned = await checkStaticRepoCloned()
    if (!isCloned) {
        await cloneStaticRepo()
    }
}

async function postbuild() {
    await readConfidentials()
    await readConfig()
    await ensureStaticRepoCloned()
    const routes = await discoverPages()
    await renderRoutesToFiles("public", routes)  
    const pagesData = await readPages(routes)
    await copyPagesJson(pagesData)
    const config = getConfig()
    const contentPath = path.join(
        config.staticPath, "content"
    )
    fs.copy(contentPath, "public/content")
}

postbuild()