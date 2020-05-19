const { discoverPages } = require("../../../misc/pages")
const { renderRouteHtml } = require("../../../postbuild/renderRoutes")
const path = require("path")

async function serve(expressApp) {
    expressApp.get("/*", async (req, res, next) => {
        const routes = await discoverPages()
        routes.push("/")
        for (const route of routes) {
            const routeUrl = path.join("/", route)
            if (req.url === routeUrl) {
                const routeHtml = await renderRouteHtml("cms-prod", true)
                res.send(routeHtml)
                return
            }
        }
        next()
    })
}

exports.serve = serve