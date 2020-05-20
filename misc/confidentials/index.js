const fs = require("fs-extra")
const passGen = require('generate-password');

const CONFIDENTIALS_PATH = "./blux-confidentials.json"

let _confidentials = null

const getFileConfidentials = async () => {
    const exists = await fs.exists(CONFIDENTIALS_PATH)
    if (exists) {
        const rawData = await fs.readFile(CONFIDENTIALS_PATH)
        const text = rawData.toString()
        const confidentials = JSON.parse(text)
        return confidentials
    } else {
        return {}
    }
}

const getEnvConfidentials = () => ({
    authUser: process.env.AUTH_USER || null,
    authPassHash: process.env.AUTH_PASS_HASH || null,
    gitUser: process.env.GIT_USER || null,
    gitPass: process.env.GIT_PASS || null
})

const getGeneratedConfidentials = () => ({
    signedCookieSecret: passGen.generate({
        length: 12, numbers: true
    })
})

async function readConfidentials() {
    const fileConfidentials = await getFileConfidentials()
    const envConfidentials = getEnvConfidentials()
    const generatedConfidentials = getGeneratedConfidentials()
    const confidentials = {
        ...envConfidentials,
        ...fileConfidentials,
        ...generatedConfidentials
    }
    _confidentials = confidentials
}

const getConfidentialsExists = () => {
    if (_confidentials === null) {
        throw new Error(
            "Confidentials file not read yet."
        )
    }
    return (_confidentials !== false)
}

const getConfidentials = () => {
    if (_confidentials === null) {
        throw new Error(
            "Confidentials file not read yet."
        )
    }
    return { ..._confidentials }
}

exports.readConfidentials = readConfidentials
exports.getConfidentialsExists = getConfidentialsExists
exports.getConfidentials = getConfidentials