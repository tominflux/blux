const fs = require("fs-extra")

const CONFIG_PATH = "./blux-config.json"

const CONFIG_DEFAULT = {
    htmlDocTitle: "Blux App"
}

async function readConfig() {
    const rawData = await fs.readFile(CONFIG_PATH)
    const text = rawData.toString()
    const fileConfig = JSON.parse(text)
    const config = {
        htmlDocTitle: fileConfig.htmlDocTitle || CONFIG_DEFAULT.htmlDocTitle
    }
    return config
}

exports.readConfig = readConfig