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
        await git.status()
        return true
    } catch (err) {
        return false
    }
}

const cloneStaticRepo = async () => {
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    console.log(`Cloning static repo: https://${staticRepo}`)
    const git = simpleGit()
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    const authRepo = `https://${gitUser}:${gitPass}@${staticRepo}`
    await git.clone(authRepo, staticPath)
    console.log("Finished cloning.")
}

const pullStaticRepo = async () => {
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    const git = simpleGit(staticPath)
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    const authRepo = `https://${gitUser}:${gitPass}@${staticRepo}`
    await git.pull(authRepo)
}

const pushStaticRepo = async () => {
    console.log("Pushing app state changes to static Git repository...")
    if (!checkCredentialsConfigured()) {
        throw new Error("Git credentials not configured.")
    }
    const { staticPath, staticRepo } = getStaticPathAndRepo()
    const adminEmail = getAdminEmail()
    const git = simpleGit(staticPath)
    const gitUser = getConfidentials().gitUser
    const gitPass = getConfidentials().gitPass
    await git.add("./*")
    await git.addConfig('user.name', 'BluxCMS Admin')
    await git.addConfig('user.email', adminEmail)
    await git.commit(
        "CMS Save State\n" + 
        "Automated commit of all app state changes."
    )
    const authRepo = `https://${gitUser}:${gitPass}@${staticRepo}`
    await git.push(authRepo)
}


exports.checkStaticRepoCloned = checkStaticRepoCloned
exports.cloneStaticRepo = cloneStaticRepo
exports.pullStaticRepo = pullStaticRepo
exports.pushStaticRepo = pushStaticRepo


///////////
///////////


const fs = require("fs-extra")
const path = require("path")

/**
 * Ensures necessary directories and home page are initialised
 * within static repo. 
 * @returns boolean
 */
const ensureStaticRepoInitialised = async () => {
    const { staticPath } = getConfig()
    //Locations of directories and home page file required
    //for repo to be considered initialised.
    const contentDir = path.join(staticPath, "content")
    const mediaDir = path.join(contentDir, "media")
    const pageDir = path.join(contentDir, "page")
    const homePath = path.join(pageDir, "index.json")
    //Functions for making required directories and generating home page.
    const makeContentDir = 
        async () => await fs.mkdir(contentDir)
    const makeMediaDir = 
        async () => await fs.mkdir(mediaDir)
    const makePageDir = 
        async () => await fs.mkdir(pageDir)
    const genHomePage = async () => {
        const homePageState = {
            blocks: [],
            id: "index",
            isDraft: false,
            modifiedDate: Date.now(),
            publishedDate: Date.now(),
            type: "default"
        }
        const homePageJson = JSON.stringify(homePageState)
        await fs.writeFile(homePath, homePageJson)
    }
    //Check if the directories & home page exist.
    //Create anything that's missing.
    const contentDirExists = await fs.exists(contentDir)
    if (!contentDirExists) {
        console.log("Creating and initialising content directory within static repo...")
        await makeContentDir()
        await makeMediaDir()
        await makePageDir()
        await genHomePage()
    } else {
        const mediaDirExists = await fs.exists(mediaDir)
        const pageDirExists = await fs.exists(pageDir)
        const homePageExists = await fs.exists(homePath)
        if (!mediaDirExists) {
            console.log("Creating and media directory within static repo...")
            await makeMediaDir()
        }
        if (!pageDirExists) {
            console.log("Creating and populating page directory within static repo...")
            await makePageDir()
            await genHomePage()
        } else if (!homePageExists) {
            console.log("Generating home page within static repo...")
            await genHomePage()
        }
    }
}


exports.ensureStaticRepoInitialised = ensureStaticRepoInitialised