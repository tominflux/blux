const simpleGit = require("simple-git/promise")
const { getConfig } = require("../config")
const { getConfidentialsExists, getConfidentials } = require("../confidentials")


const checkCredentialsConfigured = () => {
    const confidentialsExists = getConfidentialsExists()
    if (!confidentialsExists)
        return false
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    return (
        (gitUser && gitPass) ? true : false
    )
}

const getPublicPathAndRepo = () => {
    const { publicPath, publicRepo } = getConfig()
    if (publicPath === null) {
        throw new Error(
            "Public build path not configured."
        )
    }
    if (publicRepo === null) {
        throw new Error(
            "Public repo location not configured."
        )
    }
    return { publicPath, publicRepo }
}

const getAdminEmail = () => {
    const { adminEmail } = getConfig()
    if (adminEmail === null) {
        throw new Error(
            "Admin email not configured."
        )
    }
    return adminEmail
}

const checkPublicRepoCloned = async () => {
    const { publicPath, publicRepo } = getPublicPathAndRepo()
    try {      
        const git = simpleGit(publicPath)
        await git.status()
        return true
    } catch (err) {
        return false
    }
}


const clonePublicRepo = async () => {
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { publicPath, publicRepo } = getPublicPathAndRepo()
    console.log(`Cloning public repo: https://${publicRepo}`)
    const git = simpleGit()
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    const authRepo = `https://${gitUser}:${gitPass}@${publicRepo}`
    await git.clone(authRepo, publicPath)
    //console.log("Finished cloning.")
}


const pullPublicRepo = async () => {
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { publicPath, publicRepo } = getPublicPathAndRepo()
    const git = simpleGit(publicPath)
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    const authRepo = `https://${gitUser}:${gitPass}@${publicRepo}`
    await git.pull(authRepo)
}

const pushPublicRepo = async () => {
    console.log("Pushing updated public build to public Git repository...")
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { publicPath, publicRepo } = getPublicPathAndRepo()
    const adminEmail = getAdminEmail()
    const git = simpleGit(publicPath)
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    await git.add("./*")
    await git.addConfig('user.name', 'BluxCMS Admin')
    await git.addConfig('user.email', adminEmail)
    await git.commit(
        "CMS Publish\n" + 
        "Automated commit of updated public build."
    )
    const authRepo = `https://${gitUser}:${gitPass}@${publicRepo}`
    await git.push(authRepo)
}

exports.checkPublicRepoCloned = checkPublicRepoCloned
exports.clonePublicRepo = clonePublicRepo
exports.pullPublicRepo = pullPublicRepo
exports.pushPublicRepo = pushPublicRepo