const simpleGit = require("simple-git/promise")
const saveState = require("../saveState").saveState

const API_PATH = "/api/publish"


/////////
/////////


const pullFromMasterToPublic = async() => {
    const git = simpleGit()
    await git.pull("origin", "master:public")
}

const pushPublic = async () => {
    const git = simpleGit()
    await git.push('origin', "public:public")
}

const publish = async () => {
    console.log("Pushing app state changes to public Git repository branch...")
    await pullFromMasterToPublic()
    await pushPublic()
    console.log("Publish complete.")
}

/////////
/////////


const postHandler = async (req, res) => {
    try {
        await saveState()
    } catch (err) {
        console.error(err)
        next(err)
        return
    }
    try {
        await publish()
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
    expressApp.post(API_PATH, postHandler)
}


/////////
/////////


exports.configure = configure
