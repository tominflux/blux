const discoverPages = require("../../../misc/pages").discoverPages
const readPages = require("../../../misc/pages").readPages
const { HTTP_METHOD, configureAuthApi } = require("../auth")

const API_PATH = "/api/pages"

/////////
/////////


async function readHandler(req, res, next) {
    try {
        const pageIds = await discoverPages()
        const pages = await readPages(pageIds)
        res.send(pages)
    } catch(err) {
        next(err)
    }
}


/////////
/////////


function configure(expressApp) {
    configureAuthApi(
        expressApp,
        HTTP_METHOD.GET,
        API_PATH,
        readHandler
    )
}


/////////
/////////


exports.configure = configure