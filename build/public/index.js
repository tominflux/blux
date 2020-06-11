const util = require("util")
const exec = util.promisify(require('child_process').exec)
const fs = require("fs-extra")
const path = require("path")
const discoverPages = require("../../misc/pages").discoverPages
const readPages = require("../../misc/pages").readPages
const { renderRoutesToFiles } = require("../../misc/renderRoutes")
const { readConfidentials } = require("../../misc/confidentials")
const { readConfig, getConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo, pullStaticRepo } = require("../../misc/staticRepo")
const { checkPublicRepoCloned, clonePublicRepo, pullPublicRepo } = require("../../misc/publicRepo")


const getBuildPath = () => (
    path.join(getConfig().publicPath, "docs")
)

async function copyPagesJson(pagesData) {
    const buildPath = getBuildPath()
    const destFolder = path.join(buildPath, "content")
    await fs.mkdir(destFolder, { recursive: true })
    await fs.writeFile(
        path.join(destFolder, "/pages.json"),
        JSON.stringify(pagesData)
    )
}

async function ensureStaticRepoCloned() {
    const isCloned = await checkStaticRepoCloned()
    if (!isCloned) {
        await cloneStaticRepo()
    }
    await pullStaticRepo()
}

async function ensurePublicRepoCloned() {
    const isCloned = await checkPublicRepoCloned()
    if (!isCloned) {
        await clonePublicRepo()
    }
    await pullPublicRepo()
}

const cleanParcelBuild = async () => {
    const buildPath = getBuildPath()
    if (await fs.exists(buildPath)) {
        await fs.remove(buildPath)
    }
}

const runParcelBuild = async () => {
    const buildPath = getBuildPath()
    const command = (
        `npx parcel build blux/app/public/index.html ` +
        `-d ${buildPath}`
    )
    const { stdout, stderr } = await exec(command)
    if (stdout) {
        //console.log(stdout)
    }
    if (stderr) {
        throw new Error(stderr)
    }
}


async function postbuild() {
    await ensureStaticRepoCloned()
    const routes = await discoverPages(true)
    const buildPath = getBuildPath()
    console.log("Rendering routes...")
    await renderRoutesToFiles(buildPath, routes)  
    const pagesData = await readPages(routes)
    await copyPagesJson(pagesData)
    const config = getConfig()
    const staticContentPath = path.join(
        config.staticPath, "content"
    )
    const publicContentPath = path.join(
        buildPath, "content"
    )
    console.log("Copying static content...")
    await fs.copy(staticContentPath, publicContentPath)
}

async function build() {
    console.log("Performing public build...")
    await readConfidentials()
    await readConfig()
    await ensurePublicRepoCloned()
    await cleanParcelBuild()
    await runParcelBuild()
    await postbuild()
}

exports.build = build