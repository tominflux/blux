const fs = require("fs-extra")

const CONFIG_PATH = "./blux-config.json"

const CONFIG_DEFAULT = {
    htmlDocTitle: "Blux App",
    staticPath: null
}

let _config = null

async function readConfig() {
    const rawData = await fs.readFile(CONFIG_PATH)
    const text = rawData.toString()
    const fileConfig = JSON.parse(text)
    const config = {
        htmlDocTitle: fileConfig.htmlDocTitle || CONFIG_DEFAULT.htmlDocTitle,
        staticPath: fileConfig.staticPath || CONFIG_DEFAULT.staticPath
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