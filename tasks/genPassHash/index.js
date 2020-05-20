const prompt = require('prompt');
const { readConfig } = require("../../misc/config")
const { generatePassHash } = require("../../misc/auth")

const properties = [
    {
        name: 'password',
        hidden: true
    },
    {
        name: 'confirmPassword',
        hidden: true
    }
]

const genPassHash = async () => {
    await readConfig()
    prompt.start()
    prompt.get(properties, function (err, result) {
        if (err) {
            console.error(err)
            return 1
        }
        if (result.password !== result.confirmPassword) {
            console.log("Passwords do not match.")
        } else {
            generatePassHash(result.password)
            .then((hash) => {
                console.log(`Here is your hash: ${hash}`)
            })
        }
    })
}

genPassHash()