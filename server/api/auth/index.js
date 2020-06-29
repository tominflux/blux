const { getConfidentials } = require("../../../misc/confidentials")
const {
    checkAuthConfigured,
    checkAuth
} = require("../../../misc/auth")
const {
    checkSessionValid,
    createSession,
    SESSION_SHELF_LIFE
} = require("../../../misc/session")

const API_PATH = "/api/auth"


/////////
/////////


const checkSessionCookie = (req) => {
    const cookies = req.signedCookies
    //const cookies = req.cookies
    const sessionToken = cookies["bluxcms-session"]
    const validSession = (
        sessionToken ? 
            checkSessionValid(sessionToken) : false
    )
    if (!validSession) {
        const cookiesStr = JSON.stringify(cookies)
        console.log(
            `Cookies: ${cookiesStr}`
        )
    }
    return validSession
}


/////////
/////////


// GET - Check if already authenticated 
// Response: { configured : boolean, validSession : boolean }

const getHandler = async (req, res, next) => {
    try {
        const configured = checkAuthConfigured()
        const checkValidSession = () => {
            if (!configured) {
                return null
            } else {
                const validSession = checkSessionCookie(req)
                return validSession
            }
        }
        const validSession = checkValidSession()
        const responseBody = { configured, validSession }
        const responseJson = JSON.stringify(responseBody)
        res.send(responseJson)
    } catch (err) {
        next(err)
    }
}


// POST - Attempt to login
// Response: { authValid } + session-cookie
// Fail (500): Authentication not configured.

const postHandler = async (req, res, next) => {
    const authConfigured = await checkAuthConfigured()
    if (!authConfigured) {
        const err = new Error(
            "Authentication not configured."
        )
        next(err)
    } else {
        const { user, pass } = req.body 
        try {
            const authValid = await checkAuth(user, pass)
            const responseBody = { authValid }
            const responseJson = JSON.stringify(responseBody)
            if (authValid) {
                const sessionToken = await createSession(user, pass)
                const cookieOptions = {
                    httpOnly: true,
                    sameSite: true,
                    signed: true,
                    secure: process.env.NODE_ENV ? true : false,
                    maxAge: SESSION_SHELF_LIFE,
                    path: "/"
                }
                res
                .cookie(
                    "bluxcms-session", 
                    sessionToken,
                    cookieOptions
                )
                .send(responseJson)
            } else {
                res.send(responseJson)
            }
        } catch (err) {
            console.error(err)
            next(err)
        }
    }
}


/////////
/////////


function configure(expressApp) {
    expressApp.get(API_PATH, getHandler)
    expressApp.post(API_PATH, postHandler)
}


/////////
/////////


exports.configure = configure


/////////
/////////


const HTTP_METHOD = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
}

function configureAuthApi(expressApp, httpMethod, apiPath, handler) {
    const authedHandler = (req, res, next) => {
        if (!checkSessionCookie(req)) {
            const err = new Error(
                "Unauthorised API call."
            )
            next(err)
        } else (
            handler(req, res, next)
        )
    }
    switch (httpMethod) {
        case HTTP_METHOD.POST:
            expressApp.post(apiPath, authedHandler)
            break
        case HTTP_METHOD.GET:
            expressApp.get(apiPath, authedHandler)
            break
        case HTTP_METHOD.PUT:
            expressApp.put(apiPath, authedHandler)
            break
        case HTTP_METHOD.DELETE:
            expressApp.delete(apiPath, authedHandler)
            break
        default:
            throw new Error(
                `Unrecognised HTTP method: ${httpMethod}`
            )
    }
}


/////////
/////////


exports.HTTP_METHOD = HTTP_METHOD
exports.configureAuthApi = configureAuthApi
