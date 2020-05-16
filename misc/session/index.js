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


let _session = null


///////////
//EXPORTS//
///////////


const checkSessionExists = () => (
    _session !== null
)

const createSession = async (user, pass) => {
    const authValid = await checkAuth(user, pass)
    if (!authValid) {
        throw new Error(
            "Could not create session.",
            "Authentication invalid."
        )
    }
    const sessionExists = checkSessionExists()
    if (sessionExists) {
        throw new Error(
            "Could not create session.",
            "Session already exists."
        )
    }
    const sessionToken = await generateSessionToken(user, pass)
    _session = sessionToken
}

const getSession = () => (
    _session
)


////////
////////

exports.checkSessionExists = checkSessionExists
exports.createSession = createSession
exports.getSession = getSession