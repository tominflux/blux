
const { 
    checkStaticRepoCloned,
    cloneStaticRepo
} = require("../../../misc/git")

const API_PATH = "/api/git"

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
    expressApp.get(API_PATH, getHandler)
    expressApp.post(API_PATH, postHandler)
}


/////////
/////////


exports.configure = configure
