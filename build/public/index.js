const child = require("child_process")
const fs = require("fs-extra")
const path = require("path")
const discoverPages = require("../../misc/pages").discoverPages
const readPages = require("../../misc/pages").readPages
const { renderRoutesToFiles } = require("../../misc/renderRoutes")
const { readConfidentials } = require("../../misc/confidentials")
const { readConfig, getConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo, pullStaticRepo } = require("../../misc/staticRepo")
const { checkPublicRepoCloned, clonePublicRepo, pullPublicRepo } = require("../../misc/publicRepo")


async function copyPagesJson(pagesData) {
    const destFolder = "public/content/"
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

async function postbuild() {
    await ensureStaticRepoCloned()
    const routes = await discoverPages()
    await renderRoutesToFiles("public", routes)  
    const pagesData = await readPages(routes)
    await copyPagesJson(pagesData)
    const config = getConfig()
    const contentPath = path.join(
        config.staticPath, "content"
    )
    fs.copy(contentPath, "public/content")
}

const runParcelBuild = () => (
    new Promise((resolve, reject) => {
        const publicPath = getConfig().publicPath
        const command = (
            `npx parcel build blux/app/public/index.html ` +
            `-d ${publicPath}`
        )
        const callback = (error, stdout, stderr) => {
            if (stdout) console.log(stdout)
            if (stderr) console.log(stderr)
            if (error) console.error(error)
        }
        const parcelProcess = child.exec(
            command, callback
        )
        parcelProcess.addListener("error", reject)
        parcelProcess.addListener("exit", resolve)
    })
)

async function build() {
    console.log("Performing public build...")
    await readConfidentials()
    await readConfig()
    await ensurePublicRepoCloned()
    await runParcelBuild()
    await postbuild()
}

exports.build = build