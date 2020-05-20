const { HTTP_METHOD, configureAuthApi } = require("../auth")
const { pushStaticRepo } = require("../../../misc/staticRepo")

const API_PATH = "/api/save-state"


/////////
/////////

const saveState = async () => {
    console.log("Pushing app state changes to static Git repository...")
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
