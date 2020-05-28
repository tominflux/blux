const { HTTP_METHOD, configureAuthApi } = require("../auth")
const buildPublic = require("../../../build/public")
const { pushPublicRepo } = require("../../../misc/publicRepo")

const API_PATH = "/api/publish"


/////////
/////////

const publish = async () => {
    await pushPublicRepo()
}


/////////
/////////


const postHandler = async (req, res, next) => {
    res.setTimeout(120000)
    try {
        console.log("\n --- PUBLISHING --- \n")
        await buildPublic.build()
        await publish()
        console.log("\n ✓ Publish complete.\n")
        res.send()
    } catch (err) {
        console.error(err)
        next(err)
    }
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


exports.configure = configure
