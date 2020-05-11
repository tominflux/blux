const fs = require("fs-extra")
const path = require("path")
const { readConfig } = require("../../misc/config")

function processHtml(html, isCms=false) {
    const config = readConfig()
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

async function renderRoutes(buildFolder, routes, isCms=false) {
    const htmlLocation = path.join(buildFolder, "/index.html")
    const data = await fs.readFile(htmlLocation)
    const preHtml = data.toString()
    const postHtml = processHtml(preHtml, isCms)
    for(const route of routes) {
        const routeDir = path.join(
            buildFolder, route
        )
        const dirExists = await fs.exists(routeDir)
        if (!dirExists) {
            await fs.mkdir(routeDir, {recursive: true})
        }
        const newHtmlPath = path.join(
            routeDir, "/index.html"
        )
        console.log(newHtmlPath)
        await fs.writeFile(newHtmlPath, postHtml)
    }
}

exports.renderRoutes = renderRoutes