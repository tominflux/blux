const { HTTP_METHOD, configureAuthApi } = require("../auth")
const buildPublic = require("../../../build/public")
const { pushPublicRepo } = require("../../../misc/publicRepo")

const API_PATH = "/api/publish"


/////////
/////////

const publish = async () => {
    console.log("Pushing updated public build to public Git repository...")
    await pushPublicRepo()
    console.log("Publish complete.")
}


/////////
/////////


const postHandler = async (req, res, next) => {
    res.setTimeout(120000)
    try {
        await buildPublic.build()
        await publish()
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
