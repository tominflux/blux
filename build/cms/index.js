const child = require("child_process")
const { readConfidentials } = require("../../misc/confidentials")
const { readConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo, pullStaticRepo, ensureStaticRepoInitialised } = require("../../misc/staticRepo")
const { checkPublicRepoCloned, clonePublicRepo, pullPublicRepo } = require("../../misc/publicRepo")

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
    await readConfidentials()
    await readConfig()
    await ensureStaticRepoCloned()
    await ensurePublicRepoCloned()
    await ensureStaticRepoInitialised()
}

const runParcelBuild = () => (
    new Promise((resolve, reject) => {
        const cmsProdPath = "./cms-prod"
        const command = (
            `npx parcel build blux/app/cms/index.html ` +
            `-d ${cmsProdPath}`
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
    console.log("Performing CMS build...")
    await runParcelBuild()
    await postbuild()
}

exports.build = build