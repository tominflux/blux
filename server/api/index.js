const mediaApi = require("./media")
const pageApi = require("./page")
const pagesApi = require("./pages")
const pageBrowserApi = require("./pageBrowser")
//const gitApi = require("./git")
const saveStateApi = require("./saveState")
const publishApi = require("./publish")

/////////
/////////


function configure(expressApp) {
    mediaApi.configure(expressApp)
    pageApi.configure(expressApp)
    pagesApi.configure(expressApp)
    pageBrowserApi.configure(expressApp)
    //gitApi.configure(expressApp)
    saveStateApi.configure(expressApp)
    publishApi.configure(expressApp)
}


/////////
/////////


exports.configure = configure