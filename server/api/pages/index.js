const discoverPages = require("../../../misc/pages").discoverPages
const readPages = require("../../../misc/pages").readPages

const API_PATH = "/api/pages"

/////////
/////////


async function readHandler(req, res) {
    const pageIds = await discoverPages()
    const pages = await readPages(pageIds)
    res.send(pages)
}


/////////
/////////


function configure(expressApp) {
    expressApp.get(API_PATH, readHandler)
}


/////////
/////////


exports.configure = configure