const { discoverPages } = require("../../../misc/pages")
const { renderRouteHtml } = require("../../../postbuild/renderRoutes")


async function serve(expressApp) {
    const routes = await discoverPages()
    for (const route of routes) {
        const routeHtml = renderRouteHtml("./cms-prod", true)
        const requestHandler = (req, res) => {
            res.send(routeHtml)
        }
        expressApp.get(route, requestHandler)
    }
}

exports.serve = serve