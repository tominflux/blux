
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
    const { user, pass } = req.body
    const cloned = await checkStaticRepoCloned()
    if (cloned) {
        res.send("Already Cloned")
        return
    }
    try {
        await cloneStaticRepo(user, pass)
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
