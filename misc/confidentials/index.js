const fs = require("fs-extra")
const passGen = require('generate-password');

const CONFIDENTIALS_PATH = "./blux-confidentials.json"

let _confidentials = null

async function generateConfidentials() {
    const confidentials = {
        signedCookieSecret: passGen.generate({
            length: 12, numbers: true
        }),
        authUser: process.env.AUTH_USER || null,
        authPass: process.env.AUTH_PASS || null,
        /*
        gitUser: process.env.GIT_USER || null,
        gitPass: process.env.GIT_PASS || null
        */
    }
    return confidentials
}

async function readConfidentials() {
    const exists = await fs.exists(CONFIDENTIALS_PATH)
    if (exists) {
        const rawData = await fs.readFile(CONFIDENTIALS_PATH)
        const text = rawData.toString()
        const confidentials = JSON.parse(text)
        _confidentials = confidentials
    } else {
        _confidentials = await generateConfidentials()
    }
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