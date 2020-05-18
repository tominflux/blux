
const { 
    checkStaticRepoCloned,
    cloneStaticRepo
} = require("../../../misc/staticRepo")
const { HTTP_METHOD, configureAuthApi } = require("../auth")

const API_PATH = "/api/static-repo"

/////////
/////////

const getHandler = async (req, res) => {
    const isCloned = await checkStaticRepoCloned()
    res.send({ isCloned })
}

const postHandler = async (req, res, next) => {
    const cloned = await checkStaticRepoCloned()
    if (cloned) {
        const err = new Error("Already cloned.")
        next(err)
        return
    }
    try {
        await cloneStaticRepo()
        res.send("Cloned Successfully")
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
        HTTP_METHOD.GET,
        API_PATH,
        getHandler
    )
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
