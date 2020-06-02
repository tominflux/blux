const path = require("path")
const fs = require("fs-extra")
const { getConfig } = require("../../../misc/config")
const { HTTP_METHOD, configureAuthApi } = require("../auth")

const API_PATH = /\/api\/page\/(.*)/

const blankPage = () => ({
    type: "default",
    blocks: []
})

const getPageRoot = () => (
    path.join(
        getConfig().staticPath, "content/page"
    )
)
const getAbsPath = pagePath => path.join(getPageRoot(), pagePath)
const getFilePath = id => path.join(
    getConfig().staticPath, "content/page", id + ".json"
)

async function createNewPage(pagePath, count=0) {
    const suffix = (count > 0) ? `-${count}` : ""
    const name = `new-page${suffix}.json` 
    const absPath = getAbsPath(pagePath)
    const newPageAbsPath = path.join(absPath, name)
    const exists = await fs.exists(newPageAbsPath)
    if (exists) {
        return createNewFolder(mediaPath, count + 1)
    } else {
        const page = blankPage()
        const pageJson = JSON.stringify(page)
        console.log(newPageAbsPath)
        await fs.writeFile(newPageAbsPath, pageJson)
        return name
    }
}

async function readPage(pagePath) {
    const absPath = getAbsPath(pagePath)
    const exists = await fs.exists(absPath)
    if (!exists) {
        throw new Error(
            `Requested page does not exist. ${pagePath}`
        )
    }
    const pageData = await fs.readFile(absPath).toS
    const pageString = pageData.toString()
    const page = JSON.parse(pageString)
    return page
}

function validatePageUpdate(id, pageState) {
    if (typeof pageState === "undefined")
        throw new Error("Page Update failed: new page state is undefined.")
    if (pageState === null)
        throw new Error("Page Update failed: new page state is null.")
    if (id !== pageState.id)
        throw new Error(
            "Page Update failed: ID in API path does not match ID in " +
                "page state.\n" +
            "API ID: " + id + " | Page State ID: " + pageState.id
        )
}

async function updatePage(id, pageState) {
    try {
        validatePageUpdate(id, pageState)
    } catch (err) {
        throw new Error(err)
    }
    const filePath = getFilePath(id)
    const pageJson = JSON.stringify(pageState)
    await fs.writeFile(filePath, pageJson)
    const onFilePageState = await fs.readFile(filePath)
    return onFilePageState
}


/////////
/////////


const createHandler = async (req, res, next) => {
    const pagePath = req.params[0]
    try {
        const responseBody = await createNewPage(pagePath)
        res.send(responseBody)
    } catch (err) {
        next(err)
    }
}

const readHandler = async (req, res, next) => {
    const id = req.params[0] 
    try {
        const page = await readPage(id)
        const pageJson = JSON.stringify(page)
        res.send(pageJson)
    } catch (err) {
        next(err)
    }
}

function updateHandler(req, res, next) {
    const id = req.params[0] 
    updatePage(id, req.body)
    .then(
        onFilePageState => res.send(onFilePageState)
    )
    .catch(err => { 
        console.error(err)
        next(err)
    })
}


/////////
/////////


function configure(expressApp) {
    configureAuthApi(
        expressApp,
        HTTP_METHOD.POST,
        API_PATH,
        createHandler
    )
    configureAuthApi(
        expressApp,
        HTTP_METHOD.PUT,
        API_PATH,
        updateHandler
    )
}


/////////
/////////


exports.configure = configure