const { readConfidentials, getConfidentials } = require("../../misc/confidentials")
const { readConfig, getConfig } = require("../../misc/config")
const express = require("express")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const api = require("../api")
const routes = require("../routes")
const { pullStaticRepo } = require("../../misc/staticRepo")
const { pullPublicRepo } = require("../../misc/publicRepo")


const app = express()
const port = parseInt(process.env.PORT) || 3000
const env = process.env.NODE_ENV || 'development';

const forceSsl = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        const redirectUrl = 
            ['https://', req.get('Host'), req.url].join('')
        return res.redirect(redirectUrl)
    }
    return next()
}

async function run() {
    await readConfidentials()
    await readConfig()
    await pullStaticRepo()
    await pullPublicRepo()
    const signedCookieSecret = getConfidentials().signedCookieSecret
    const config = getConfig()
    app.use(express.json())
    app.use(cookieParser(signedCookieSecret))
    app.use(fileUpload())
    if (env !== "development")
        app.use(forceSsl)
    routes.serve(app, "./cms-prod")
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