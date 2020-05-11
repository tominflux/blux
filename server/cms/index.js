const { readConfig, getConfig } = require("../../misc/config")
const express = require("express")
const fileUpload = require('express-fileupload');
const api = require("../api")

const app = express()
const port = parseInt(process.env.PORT) || 3000

async function run() {
    await readConfig()
    const config = getConfig()
    app.use(express.json())
    app.use(fileUpload())
    app.use(express.static("./cms-prod"))
    app.use(express.static(config.staticPath))
    api.configure(app)
    app.listen(
        port, () => {
            console.log(
                `CMS server listening on port ${port}!`
            )
        }
    )
}

run()