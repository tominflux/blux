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

function validatePageState(pageId, pageState) {
    const throwInvalid = (msg) => {
        throw new Error(
            `Invalid Page State: ${msg}. [pageId=${pageId}]`
        )
    }
    if (!pageState)
        throwInvalid("no page state provided")
    if (!pageState.type) 
        throwInvalid("no page type specified.")
    if (!Array.isArray(pageState.blocks)) 
        throwInvalid(`no page blocks array provided`)
    if (pageId !== pageState.id)
        throwInvalid(
            `ID from API path does not math ID in page state `
            `[pageState.id=${pageState.id}]`
        )
}

//////////
//////////


async function createNewPage(parentPath, pageState, count=0) {
    //
    const suffix = (count > 0) ? `-${count}` : ""
    const baseId = `new-page${suffix}`
    const name = `${baseId}.json`
    const absParentPath = getAbsPath(parentPath)
    const newPageId = path.join(absParentPath, baseId)
    const newPageAbsPath = path.join(absParentPath, name)
    //
    const exists = await fs.exists(newPageAbsPath)
    if (exists) {
        return createNewPage(parentPath, pageState, count + 1)
    } else {
        const pageStateWithId = {
            id: newPageId,
            ...pageState
        }
        validatePageState(newPageId, pageStateWithId)
        const pageJson = JSON.stringify(pageStateWithId)
        await fs.writeFile(newPageAbsPath, pageJson)
        return name
    }
}

async function readPage(pageId) {
    const absPath = getFilePath(pageId)
    const exists = await fs.exists(absPath)
    if (!exists) {
        throw new Error(
            `Requested page does not exist. ${absPath}`
        )
    }
    const pageData = await fs.readFile(absPath)
    const pageString = pageData.toString()
    const page = JSON.parse(pageString)
    return page
}

async function updatePage(pageId, pageState) {
    const absPath = getFilePath(pageId)
    const exists = await fs.exists(absPath)
    if (!exists) {
        throw new Error(
            `Requested page does not exist. ${absPath}`
        )
    }
    try {
        validatePageState(pageId, pageState)
    } catch (err) {
        throw new Error(err)
    }
    const filePath = getFilePath(pageId)
    const pageJson = JSON.stringify(pageState)
    await fs.writeFile(filePath, pageJson)
    const onFilePageState = await fs.readFile(filePath)
    return onFilePageState
}


/////////
/////////


const createHandler = async (req, res, next) => {
    const parentPath = req.params[0]
    const pageState = req.body
    try {
        const responseBody = await createNewPage(parentPath, pageState)
        res.send(responseBody)
    } catch (err) {
        next(err)
    }
}

const readHandler = async (req, res, next) => {
    const pageId = req.params[0] 
    try {
        const pageState = await readPage(pageId)
        const pageJson = JSON.stringify(pageState)
        res.send(pageJson)
    } catch (err) {
        next(err)
    }
}

function updateHandler(req, res, next) {
    const pageId = req.params[0] 
    updatePage(pageId, req.body)
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
        HTTP_METHOD.GET,
        API_PATH,
        readHandler
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