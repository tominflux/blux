const fs = require("fs-extra")

const SECRETS_PATH = "./blux-secrets.json"

let _secrets = null

async function readSecrets() {
    const exists = await fs.exists(SECRETS_PATH)
    if (exists) {
        const rawData = await fs.readFile(SECRETS_PATH)
        const text = rawData.toString()
        const secrets = JSON.parse(text)
        _secrets = secrets
    } else {
        _secrets = false
    }
}

const getSecretsExists = () => {
    if (_secrets === null) {
        throw new Error(
            "Secrets file not read yet."
        )
    }
    return (_secrets !== false)
}

const getSecrets = () => {
    if (_secrets === null) {
        throw new Error(
            "Secrets file not read yet."
        )
    }
    return { ..._secrets }
}

exports.readSecrets = readSecrets
exports.getSecretsExists = getSecretsExists
exports.getSecrets = getSecrets