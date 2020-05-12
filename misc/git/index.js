const simpleGit = require("simple-git/promise")
const { getConfig } = require("../config")

const getStaticPathAndRepo = () => {
    const { staticPath, staticRepo } = getConfig()
    if (staticPath === null) {
        throw new Error(
            "Static content path not configured."
        )
    }
    if (staticRepo === null) {
        throw new Error(
            "Static repo location not configured."
        )
    }
    return { staticPath, staticRepo }
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

const checkStaticRepoCloned = async () => {
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    try {      
        const git = simpleGit(staticPath)
        const status = await git.status()
        console.log(status)
        return true
    } catch (err) {
        return false
    }
}

const cloneStaticRepo = async (user, pass) => {
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    const git = simpleGit()
    const authRepo = `https://${user}:${pass}@${staticRepo}`
    await git.clone(authRepo, staticPath)
}

const pullStaticRepo = async (user, pass) => {
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    const git = simpleGit(staticPath)
    const authRepo = `https://${user}:${pass}@${staticRepo}`
    await git.pull(authRepo)
}

const pushStaticRepo = async (user, pass) => {
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    const adminEmail = getAdminEmail()
    const git = simpleGit(staticPath)
    await git.add("./*")
    await git.addConfig('user.name', 'BluxCMS')
    await git.addConfig('user.email', adminEmail)
    await git.commit(
        "CMS Save State\n" + 
        "Automated commit of all app state changes."
    )
    const authRepo = `https://${user}:${pass}@${staticRepo}`
    await git.push(authRepo)
}

exports.checkStaticRepoCloned = checkStaticRepoCloned
exports.cloneStaticRepo = cloneStaticRepo
exports.pullStaticRepo = pullStaticRepo
exports.pushStaticRepo = pushStaticRepo