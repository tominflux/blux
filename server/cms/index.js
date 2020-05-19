const { readConfidentials, getConfidentials } = require("../../misc/confidentials")
const { readConfig, getConfig } = require("../../misc/config")
const express = require("express")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const api = require("../api")
const routes = require("./routes")

const app = express()
const port = parseInt(process.env.PORT) || 3000

async function run() {
    await readConfidentials()
    await readConfig()
    const signedCookieSecret = getConfidentials().signedCookieSecret
    const config = getConfig()
    app.use(express.json())
    app.use(cookieParser(signedCookieSecret))
    app.use(fileUpload())
    routes.serve(app)
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