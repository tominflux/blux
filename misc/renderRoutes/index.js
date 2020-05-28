const fs = require("fs-extra")
const path = require("path")
const { getConfig } = require("../config")

async function processHtml(html, isCms=false) {
    const config = getConfig()
    const replaceTitle = (input) => (
        input.replace(
            "[Blux-App-Title]", 
            config.htmlDocTitle +
            (isCms ? " [CMS]" : "")
        )
    )
    const htmlTitleReplaced = replaceTitle(html)
    return htmlTitleReplaced
}

async function renderRouteHtml(buildFolder, isCms) {
    const htmlLocation = path.join(buildFolder, "/index.html")
    const data = await fs.readFile(htmlLocation)
    const preHtml = data.toString()
    const postHtml = await processHtml(preHtml, isCms)
    return postHtml
}

async function renderRoutesToFiles(buildFolder, routes, isCms=false) {
    const htmlLocation = path.join(buildFolder, "/index.html")
    const data = await fs.readFile(htmlLocation)
    const preHtml = data.toString()
    const postHtml = await processHtml(preHtml, isCms)
    for(const route of routes) {
        const routeDir = path.join(
            buildFolder, route
        )
        const dirExists = await fs.exists(routeDir)
        if (!dirExists) {
            await fs.mkdir(routeDir, {recursive: true})
        }
        const newHtmlPath = (
            (route === "index") ?
                path.join(buildFolder, "/index.html") :
                path.join(routeDir, "/index.html")
        )
        //console.log(newHtmlPath)
        await fs.writeFile(newHtmlPath, postHtml)
    }
}

exports.renderRouteHtml = renderRouteHtml
exports.renderRoutesToFiles = renderRoutesToFiles