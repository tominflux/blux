const path = require("path")
const fs = require("fs-extra")
const { getConfig } = require("../../../misc/config")
const { HTTP_METHOD, configureAuthApi } = require("../auth")

const API_PATH = /\/api\/page\/(.*)/

const blankPage = () => ({
    type: "default",
    blocks: []
})

const getFilePath = id => path.join(
    getConfig().staticPath, "content/page", id + ".json"
)

async function createNewPage(id) {
    const page = blankPage()
    const pageJson = JSON.stringify(page)
    const filePath = getFilePath(id)
    await fs.writeFile(filePath, pageJson)
    const onFilePageState = await fs.readFile(filePath)
    return onFilePageState
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


function createHandler(req, res) {
    const id = req.params[0]
    createNewPage(id)
    .then(
        onFilePageState => res.send(onFilePageState)
    )
    .catch(err => { 
        console.error(err)
        next(err)
    })
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