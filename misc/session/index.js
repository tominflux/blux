const bcrypt = require('bcrypt')
const { getConfig } = require("../config")
const { checkAuth } = require("../auth")


////////
////////


const generateSessionToken = (user, pass) => {
    const timestamp = Date.now()
    const rawToken = `${user}-${pass}-${timestamp}`
    //
    const saltRounds = getConfig().authSaltRounds
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(rawToken, salt, function (err, hash) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            }
        })
    })
}


////////
////////

//Key: session-token
//Value: expires
const _sessions = new Map()

const SESSION_SHELF_LIFE = 1000 * 60 * 30


///////////
//EXPORTS//
///////////

const checkSessionValid = (sessionToken) => (
    Date.now() < _sessions.get(sessionToken)
)

const createSession = async (user, pass) => {
    const authValid = await checkAuth(user, pass)
    if (!authValid) {
        throw new Error(
            "Could not create session.",
            "Authentication invalid."
        )
    }
    const sessionToken = await generateSessionToken(user, pass)
    const expires = Date.now() + SESSION_SHELF_LIFE
    _sessions.set(sessionToken, expires)
    return sessionToken
}

////////
////////

exports.checkSessionValid = checkSessionValid
exports.createSession = createSession
exports.SESSION_SHELF_LIFE = SESSION_SHELF_LIFE