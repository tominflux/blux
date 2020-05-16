const { readSecrets, getSecrets } = require("../../misc/secrets")
const { readConfig } = require("../../misc/config")
const express = require("express")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const parcelBundler = require('parcel-bundler')
const api = require("../api")

const app = express()
const port = parseInt(process.env.PORT) || 3000
const bundler = new parcelBundler("./blux/app/cms/index.html", {})

async function run() {
    await readSecrets()
    await readConfig()
    const signedCookieSecret = getSecrets().signedCookieSecret
    app.use(express.json())
    app.use(cookieParser(signedCookieSecret))
    app.use(fileUpload())
    app.use(express.static("./static"))
    api.configure(app)
    app.use(bundler.middleware())
    app.listen(
        port, () => {
            console.log(
                `Development server listening on port ${port}!`
            )
        }
    )
}

run()