const {
    checkAuthConfigured,
    checkAuth
} = require("../../../misc/auth")
const {
    checkSessionExists,
    createSession,
    getSession
} = require("../../../misc/session")

const API_PATH = "/api/auth"


/////////
/////////

const LOGIN_CIRCUMSTANCE = {
    AUTH_INVALID: "AUTH_INVALID",
    SESSION_EXISTS: "SESSION_EXISTS",
    SUCCESSFUL: "SUCCESSFUL"
}

const throwUnexpectedCircumstance = () => {
    const errMsg = `Unexpected circumstance.`
    throw new Error(errMsg)
}

const getLoginCircumstance = async (user, pass) => {
    const authValid = await checkAuth(user, pass)
    if (authValid === false) {
        return LOGIN_CIRCUMSTANCE.AUTH_INVALID
    } else if (authValid === true) {
        const sessionExists = await checkSessionExists()
        if (sessionExists === true) {
            return LOGIN_CIRCUMSTANCE.SESSION_EXISTS
        } else if (sessionExists === false) {
            return LOGIN_CIRCUMSTANCE.SUCCESSFUL
        } else {
            throwUnexpectedCircumstance()
        }
    } else {
        throwUnexpectedCircumstance()
    }
}

const handleLoginCircumstance = async (circumstance, user, pass, res) => {
    const onAuthInvalid = async () => {
        const responseBody = { authValid: false }
        const responseJson = JSON.stringify(responseBody)
        res.send(responseJson)
    }
    const onSessionExists = async () => {
        const responseBody = {
            authValid: true,
            sessionAvailable: false
        }
        const responseJson = JSON.stringify(responseBody)
        res.send(responseJson)
    }
    const onSuccessful = async () => {
        const responseBody = {
            authValid: true,
            sessionAvailable: true
        }
        const responseJson = JSON.stringify(responseBody)
        await createSession(user, pass)
        const sessionToken = getSession()
        const cookieOptions = {
            httpOnly: true,
            signed: true
        }
        res
        .cookie(
            "bluxcms-session", 
            sessionToken,
            cookieOptions
        )
        .send(responseJson)
    }
    switch (circumstance) {
        case LOGIN_CIRCUMSTANCE.AUTH_INVALID:
            await onAuthInvalid()
            break
        case LOGIN_CIRCUMSTANCE.SESSION_EXISTS:
            await onSessionExists()
            break
        case LOGIN_CIRCUMSTANCE.SUCCESSFUL:
            await onSuccessful()
            break
        default:
            throwUnexpectedCircumstance()
    }
}


/////////
/////////


const getHandler = async (req, res, next) => {
    try {
        const authConfigured = await checkAuthConfigured()
        if (authConfigured) {
            const responseBody = { configured: "true" }
            const responseJson = JSON.stringify(responseBody)
            res.send(responseJson)
        } else {
            const responseBody = { configured: "false" }
            const responseJson = JSON.stringify(responseBody)
            res.send(responseJson)
        }
    } catch (err) {
        next(err)
    }
}

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
            const loginCircumstance = await getLoginCircumstance(user, pass)
            await handleLoginCircumstance(loginCircumstance, user, pass, res)
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


