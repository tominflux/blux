const { discoverPages } = require("../../../misc/pages")
const { renderRouteHtml } = require("../../../postbuild/renderRoutes")


async function serve(expressApp) {
    const routes = await discoverPages()
    for (const route of routes) {
        const requestHandler = (req, res) => {
            const routeHtml = renderRouteHtml("cms-prod", true)
            res.send(routeHtml)
        }
        expressApp.get(route, requestHandler)
    }
}

exports.serve = serve