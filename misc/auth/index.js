const bcrypt = require('bcrypt')
const { getConfidentialsExists: getConfidentialsExists, getConfidentials } = require("../confidentials")
const { getConfig } = require("../config")

const generatePassHash = (pass) => {
    const saltRounds = getConfig().authSaltRounds
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(pass, salt, function (err, hash) {
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

const checkPassAgainstPassHash = (pass, passHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, passHash, function(err, isMatch) {
            if (err) {
                reject(err)
            } else if (!isMatch) {
                resolve(false)
            } else {
                resolve(true)
            }
        }) 
    })
}

const checkAuthConfigured = () => {
    const confidentialsExists = getConfidentialsExists()
    if (!confidentialsExists) {
        console.warn("No auth configured - Confidentials do not exist.")
        return false
    }
    const authUser = getConfidentials().authUser
    const authPassHash = getConfidentials().authPassHash
    const configured = (authUser && authPassHash) ? true : false
    if (!configured) {
        console.warn(
            "No auth configured - Confidentials not configured.\n" +
            `authUser: ${authUser}\n` +
            `authPassHash: ${authPassHash}`
        )
        return false
    }
    return true
}

const checkAuth = async (user, pass) => {
    if (!checkAuthConfigured()) {
        throw new Error("Authentication not configured.")
    }
    if (!user || !pass)
        return false
    const authUser = getConfidentials().authUser
    const authPassHash = getConfidentials().authPassHash
    const userMatch = (user === authUser)
    const passMatch = await checkPassAgainstPassHash(pass, authPassHash)
    return (userMatch && passMatch)
}

exports.generatePassHash = generatePassHash
exports.checkAuthConfigured = checkAuthConfigured
exports.checkAuth = checkAuth
