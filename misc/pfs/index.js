const fs = require("fs")

const readdir = (directory) => {
    return new Promise (
        (resolve, reject) => {
            fs.readdir(directory, (err, fileNames) => {
                if (err) reject(err)
                else resolve(fileNames)
            })
        }
    )
}
const lstat = (pathName) => {
    return new Promise(
        (resolve, reject) => {
            fs.lstat(pathName, (err, stat) => {
                if (err) reject(err)
                else resolve(stat)
            })
        }
    )
}
const readFile = (filePath) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        }
    )
}
const writeFile = (filePath, data) => {
    return new Promise(
        (resolve, reject) => {
            try {
                fs.writeFile(filePath, data, () => resolve())
            } catch (err) {
                reject(err)
            }
        }
    )
}
const exists = (filePath) => {
    return new Promise(
        (resolve, reject) => {
            try {
                fs.exists(filePath, (exists) => resolve(exists))
            } catch (err) {
                reject(err)
            }
        }
    )
}
const mkdir = (filePath) => {
    return new Promise(
        (resolve, reject) => {
            try {
                fs.mkdir(filePath, () => resolve())
            } catch (err) {
                reject(err)
            }
        }
    )
}

module.exports = {
    readdir,
    lstat,
    readFile,
    writeFile,
    exists,
    mkdir
}