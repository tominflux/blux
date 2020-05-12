const fs = require("fs-extra")

const CONFIG_PATH = "./blux-config.json"

const CONFIG_DEFAULT = {
    htmlDocTitle: "Blux App",
    staticRepo: null,
    staticPath: null,
    adminEmail: null
}

let _config = null

async function readConfig() {
    const rawData = await fs.readFile(CONFIG_PATH)
    const text = rawData.toString()
    const fileConfig = JSON.parse(text)
    const config = {
        htmlDocTitle: fileConfig.htmlDocTitle || CONFIG_DEFAULT.htmlDocTitle,
        staticRepo: fileConfig.staticRepo || CONFIG_DEFAULT.staticRepo,
        staticPath: fileConfig.staticPath || CONFIG_DEFAULT.staticPath,
        adminEmail: fileConfig.adminEmail || CONFIG_DEFAULT.adminEmail
    }
    _config = config
}

const getConfig = () => { 
    if (!_config) {
        throw new Error(
            "Config file not read yet."
        )
    }
    return { ..._config }
}

exports.readConfig = readConfig
exports.getConfig = getConfig