const simpleGit = require("simple-git/promise")
const { getConfig } = require("../../../misc/config")
const {
    pushStaticRepo
} = require("../../../misc/staticRepo")
const path = require("path")
const { HTTP_METHOD, configureAuthApi } = require("../auth")

const API_PATH = "/api/save-state"


/////////
/////////

const saveState = async () => {
    console.log("Pushing app state changes to master Git repository...")
    await pushStaticRepo()
    console.log("Save state complete.")
}


/////////
/////////


const postHandler = async (req, res, next) => {
    try {
        await saveState()
    } catch (err) {
        console.error(err)
        next(err)
        return
    }
    res.send()
}


/////////
/////////


function configure(expressApp) {
    configureAuthApi(
        expressApp,
        HTTP_METHOD.POST,
        API_PATH,
        postHandler
    )
}


/////////
/////////


exports.saveState = saveState
exports.configure = configure
