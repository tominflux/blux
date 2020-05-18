const bcrypt = require('bcrypt')
const { getSecretsExists, getSecrets } = require("../secrets")
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
    const secretsExists = getSecretsExists()
    if (!secretsExists)
        return false
    const authUser = getSecrets().authUser
    const authPassHash = getSecrets().authPassHash
    return (
        (authUser && authPassHash) ? true : false
    )
}

const checkAuth = async (user, pass) => {
    if (!checkAuthConfigured()) {
        throw new Error("Authentication not configured.")
    }
    if (!user || !pass)
        return false
    const authUser = getSecrets().authUser
    const authPassHash = getSecrets().authPassHash
    const userMatch = (user === authUser)
    const passMatch = await checkPassAgainstPassHash(pass, authPassHash)
    return (userMatch && passMatch)
}

exports.generatePassHash = generatePassHash
exports.checkAuthConfigured = checkAuthConfigured
exports.checkAuth = checkAuth
