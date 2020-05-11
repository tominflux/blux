const discoverPages = require("../../misc/pages").discoverPages
const renderRoutes = require("../renderRoutes").renderRoutes

async function postbuild() {
    const routes = await discoverPages()
    await renderRoutes("cms-prod", routes, true)  
}

postbuild()