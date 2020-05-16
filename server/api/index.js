const authApi = require("./auth")
const staticRepoApi = require("./staticRepo")
const mediaApi = require("./media")
const pageApi = require("./page")
const pagesApi = require("./pages")
const pageBrowserApi = require("./pageBrowser")
const saveStateApi = require("./saveState")
const publishApi = require("./publish")

/////////
/////////


function configure(expressApp) {
    authApi.configure(expressApp)
    saveStateApi.configure(expressApp)
    mediaApi.configure(expressApp)
    pageApi.configure(expressApp)
    pagesApi.configure(expressApp)
    pageBrowserApi.configure(expressApp)
    staticRepoApi.configure(expressApp)
    publishApi.configure(expressApp)
}


/////////
/////////


exports.configure = configure