
const { readConfidentials } = require("../../misc/confidentials")
const { readConfig } = require("../../misc/config")
const { checkStaticRepoCloned, cloneStaticRepo } = require("../../misc/staticRepo")


async function ensureStaticRepoCloned() {
    const isCloned = await checkStaticRepoCloned()
    if (!isCloned) {
        await cloneStaticRepo()
    }
}

async function postbuild() {
    await readConfidentials()
    await readConfig()
    await ensureStaticRepoCloned()
}

postbuild()