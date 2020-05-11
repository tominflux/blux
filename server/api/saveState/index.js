const simpleGit = require("simple-git/promise")


const API_PATH = "/api/save-state"


/////////
/////////


const commitChanges = async () => {
    const git = simpleGit()
    await git.add("./static/*")
    await git.addConfig('user.name', 'BluxCMS')
    await git.addConfig('user.email', '...')
    await git.commit(
        "CMS Save State\n" + 
        "Automated commit of all app state changes."
    )
}

const pushMaster = async (user, pass) => {
    const git = simpleGit()
    const repo = ''
    const remote = `https://${user}:${pass}@${repo}`
    await git.push(remote, "master:master")
}



const saveState = async (user, pass) => {
    console.log("Pushing app state changes to master Git repository...")
    await commitChanges()
    await pushMaster(user, pass)
    console.log("Save state complete.")
}


/////////
/////////


const postHandler = async (req, res, next) => {
    const {user, pass} = req.body
    console.log(`User: ${user}`)
    try {
        await saveState(user, pass)
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


exports.saveState = saveState
exports.configure = configure