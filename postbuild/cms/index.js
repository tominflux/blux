const discoverPages = require("../../misc/pages").discoverPages
const renderRoutes = require("../copyRoutes").copyRoutes

async function postbuild() {
    const routes = await discoverPages()
    await renderRoutes("cms-prod", routes, true)  
}

postbuild()