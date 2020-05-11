const fs = require("fs-extra")
const path = require("path")
const discoverPages = require("../../misc/pages").discoverPages
const readPages = require("../../misc/pages").readPages
const renderRoutes = require("../renderRoutes").renderRoutes
const { readConfig, getConfig } = require("../config")

async function copyPagesJson(pagesData) {
    const destFolder = "public/content/"
    await fs.mkdir(destFolder, { recursive: true })
    await fs.writeFile(
        path.join(destFolder, "/pages.json"),
        JSON.stringify(pagesData)
    )
}

async function postbuild() {
    await readConfig()
    const routes = await discoverPages()
    await renderRoutes("public", routes)  
    const pagesData = await readPages(routes)
    await copyPagesJson(pagesData)
    const config = getConfig()
    const contentPath = path.join(
        config.static, "content"
    )
    fs.copy(contentPath, "public/content")
}

postbuild()