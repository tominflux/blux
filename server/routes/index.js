const { discoverPages } = require("../../misc/pages")
const { renderRouteHtml } = require("../../misc/renderRoutes")
const path = require("path")
const fs = require("fs-extra")

async function serve(expressApp, htmlFolderLocation) {
    expressApp.get("/*", async (req, res, next) => {
        const htmlPath = path.join(htmlFolderLocation, "index.html")
        const htmlFileExists = await fs.exists(htmlPath)
        if (!htmlFileExists) {
            res.send(
                "<p> " + 
                    "Could not render route, HTML document " +
                    "does not exist yet." +
                "</p>" +
                "<p>" + 
                    "Website files may not have finished building. " +
                "</p>"
            )
            return
        }
        const routes = await discoverPages()
        routes.push("/")
        for (const route of routes) {
            const routeUrl = path.join("/", route)
            if (req.url === routeUrl) {
                const routeHtml = await renderRouteHtml(
                    htmlFolderLocation, true
                )
                res.send(routeHtml)
                return
            }
        }
        next()
    })
}

exports.serve = serve