const { HTTP_METHOD, configureAuthApi } = require("../auth")
const { pushStaticRepo } = require("../../../misc/staticRepo")

const API_PATH = "/api/save-state"


/////////
/////////

const saveState = async () => {
    await pushStaticRepo()
}


/////////
/////////


const postHandler = async (req, res, next) => {
    try {
        console.log("\n --- SAVING STATE --- \n")
        await saveState()
        console.log("\n ✓ Save state complete.")
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
