/*
const { 
    checkRepoInitialised, initialiseRepo 
} = require("../../../misc/git")

const API_PATH = "/api/git"

/////////
/////////

const getHandler = async (req, res) => {
    const initialised = await checkRepoInitialised()
    res.send({ initialised })
}

const postHandler = async (req, res, next) => {
    const { user, pass } = req.body
    const initialised = await checkRepoInitialised()
    if (initialised) {
        res.send()
    }
    try {
        await initialiseRepo(user, pass)
        res.send()
    } catch (err) {
        console.error(err)
        next(err)
    }
}


/////////
/////////


function configure(expressApp) {
    expressApp.get(API_PATH, getHandler)
    expressApp.post(API_PATH, postHandler)
}


/////////
/////////


exports.configure = configure
*/