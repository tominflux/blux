import "regenerator-runtime/runtime"
import { getBlockMap } from "../blockMap"
import { getRunType, RUN_TYPE } from "../misc"
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


export async function savePageState(pageState){
    const pageId = pageState.id
    const pageApiPath = path.join(API_PATH, pageId)
    const persistifiedPageState = persistify(pageState)
    const pageJson = JSON.stringify(persistifiedPageState)
    const response = await fetch(pageApiPath, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: pageJson
    })
}

export async function loadPageStates() {
    const pagesLocation = (
        getRunType() === RUN_TYPE.CMS ? 
            "/api/pages" : "/content/pages.json"
    )
    const response = await fetch(pagesLocation)
    const persistifiedPageStates = await response.json()
    const pageStates = persistifiedPageStates.map(
        persistifiedPageState => unpersistify(
            persistifiedPageState
        )
    )
    return pageStates
}