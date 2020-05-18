const fs = require("fs-extra")

const CONFIDENTIALS_PATH = "./blux-confidentials.json"

let _confidentials = null

async function readConfidentials() {
    const exists = await fs.exists(CONFIDENTIALS_PATH)
    if (exists) {
        const rawData = await fs.readFile(CONFIDENTIALS_PATH)
        const text = rawData.toString()
        const confidentials = JSON.parse(text)
        _confidentials = confidentials
    } else {
        _confidentials = false
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