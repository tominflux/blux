import "regenerator-runtime/runtime"
import { getBlockMap } from "../blockMap"
import { getRunType, RUN_TYPE, quickObjectCompare } from "../misc"
import { modified } from "../page/redux/actions"
import store from "../redux/store"
const path = require("path")

const API_PATH = "/api/page/"

const persistify = (pageState) => ({
    ...pageState,
    blocks: pageState.blocks.map(
        block => {
            const blockMap = getBlockMap()
            if (!blockMap.has(block.type))
                throw new Error(
                    "Block type '" + block.type + "' " +
                    "does not exist."
                )
            const blockDescriptor = blockMap.get(block.type)
            if (blockDescriptor.persistifier) {
                const persistifiedBlockState =
                    blockDescriptor.persistifier
                        .persistify(block)
                return persistifiedBlockState
            } else {
                return block
            }
        }
    )
})

const unpersistify = (persistifiedPageState) => ({
    ...persistifiedPageState,
    blocks: persistifiedPageState.blocks.map(
        persistifiedBlock => {
            const blockMap = getBlockMap()
            if (!blockMap.has(persistifiedBlock.type))
                throw new Error(
                    "Block type '" + persistifiedBlock.type + "' " +
                    "does not exist."
                )
            const blockDescriptor = blockMap.get(
                persistifiedBlock.type
            )
            if (blockDescriptor.persistifier) {
                const unpersistifiedBlockState =
                    blockDescriptor.persistifier
                        .unpersistify(persistifiedBlock)
                return unpersistifiedBlockState
            } else {
                return persistifiedBlock
            }
        }
    )
})

async function checkPageModified(persistifiedPageState, pageApiPath) {
    const response = await fetch(pageApiPath)
    const serverPageState = await response.json()
    const pageModified = (
        !quickObjectCompare(persistifiedPageState, serverPageState)
    )
    return pageModified
}

export async function savePageState(pageState) {
    const pageId = pageState.id
    const pageApiPath = path.join(API_PATH, pageId)
    const persistifiedPageState = persistify(pageState)
    //Check if page was modified. (Different to page on server)
    const pageModified = await checkPageModified(
        persistifiedPageState, pageApiPath
    )
    if (pageModified) {
        const modifiedDate = Date.now()
        //Make sure same modified date is sent with
        //page update on server as locally.
        const persistifiedPageStateWithModifiedDate = {
            ...persistifiedPageState,
            modifiedDate
        }
        //Update page on server.
        const pageJson = JSON.stringify(
            persistifiedPageStateWithModifiedDate
        )
        const response = await fetch(pageApiPath, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: pageJson
        })
        if (!response.ok) {
            alert("Could not save page state.")
            console.error(pageState)
            throw new Error(
                "Could not save page state."
            )
        }
        //Update modified date locally.
        const pageModifiedAction = modified(pageId, modifiedDate)
        store.dispatch(pageModifiedAction)
    }
}

export async function loadPageStates() {
    const pagesLocation = (
        getRunType() === RUN_TYPE.CMS ?
            "/api/pages" : "/content/pages.json"
    )
    const response = await fetch(pagesLocation)
    if (!response.ok) {
        alert("Could not load page states.")
        throw new Error(
            "Could not load page states.\n" +
            response.body
        )
    }
    try {
        const persistifiedPageStates = await response.json()
        const pageStates = persistifiedPageStates.map(
            persistifiedPageState => unpersistify(
                persistifiedPageState
            )
        )
        return pageStates
    } catch (err) {
        alert("Could not load page states.")
        throw err
    }
}