const discoverPages = require("../../misc/pages").discoverPages
const renderRoutes = require("../renderRoutes").renderRoutes
const { readConfig, getConfig } = require("../../misc/config")

async function postbuild() {
    await readConfig()
    const routes = await discoverPages()
    await renderRoutes("cms-prod", routes, true)  
}

postbuild()