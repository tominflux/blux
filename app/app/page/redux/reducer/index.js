import { 
    CREATE_BLOCK, 
    DELETE_BLOCK, 
    BLOCK_ACTION, 
    MOVE_BLOCK_UP,
    MOVE_BLOCK_DOWN,
    MODIFIED,
    PUBLISH,
    UNPUBLISH
} from "../actionTypes"
import BlockReducer from "../../../block/redux/reducer"
import { immutableInsert, immutableSwap } from "../../../misc"
import { PAGE_ACTION } from "../../../redux/actionTypes"
import { getPageMap } from "../../../pageMap"
import { getBlockMap } from "../../../blockMap"


///////////
///////////


export const getBlockById = (id, blocks) => (
    blocks.filter(
        block => (block.id === id)
    )[0] || null
)

const removeBlock = (id, blocks) => blocks.filter(
    (block) => block.id !== id
)

const replaceBlock = (id, newBlock, blocks) => {
    const oldBlock = getBlockById(id, blocks)
    const oldBlockIndex = blocks.indexOf(oldBlock)
    const blocksBefore = blocks.slice(0, oldBlockIndex)
    const blocksAfter = blocks.slice(oldBlockIndex + 1)
    return [
        ...blocksBefore,
        newBlock,
        ...blocksAfter
    ]
}

const swapBlocks = (indexA, indexB, blocks) => 
    immutableSwap(indexA, indexB, blocks)

const insertBlock = (newBlock, blockBeforeId, blocks) => {
    const blockBefore = getBlockById(blockBeforeId, blocks)
    const blockBeforeIndex = blocks.indexOf(blockBefore)
    return immutableInsert(newBlock, blockBeforeIndex, blocks)
}


///////////
///////////


export default function PageReducer(
    pageState, pageAction
) {
    switch (pageAction.type) {
        //
        // Reduce page block-collection actions
        //
        case CREATE_BLOCK:
            const { blockBeforeId, newBlockState } = pageAction.payload
            const newBlocks = insertBlock(
                newBlockState, blockBeforeId, pageState.blocks
            )
            return {
                ...pageState,
                blocks: newBlocks
            }
        case DELETE_BLOCK:
            const { idToDelete } = pageAction.payload
            return {
                ...pageState,
                blocks: removeBlock(idToDelete, pageState.blocks),
                modifiedDate: Date.now()
            }
        case MOVE_BLOCK_UP:
            const { idToMoveUp } = pageAction.payload
            const blockToMoveUp = getBlockById(
                idToMoveUp, pageState.blocks
            )
            const blockToMoveUpIndex = pageState.blocks.indexOf(
                blockToMoveUp
            )
            if (blockToMoveUpIndex === 0) {
                return pageState
            } else {
                const indexA = blockToMoveUpIndex
                const indexB = indexA - 1
                const blocksMovedUp = swapBlocks(
                    indexA, indexB, pageState.blocks
                )
                return {
                    ...pageState,
                    blocks: blocksMovedUp
                }
            }
        case MOVE_BLOCK_DOWN:
            const { idToMoveDown } = pageAction.payload
            const blockToMoveDown = getBlockById(
                idToMoveDown, pageState.blocks
            )
            const blockToMoveDownIndex = pageState.blocks.indexOf(
                blockToMoveDown
            )
            if (blockToMoveDownIndex === pageState.blocks.length - 1) {
                return pageState
            } else {
                const indexA = blockToMoveDownIndex
                const indexB = indexA + 1
                const blocksMovedDown = swapBlocks(
                    indexA, indexB, pageState.blocks
                )
                return {
                    ...pageState,
                    blocks: blocksMovedDown
                }
            }
        case BLOCK_ACTION:
            const { blockId, blockAction } = pageAction.payload
            const blockState = getBlockById(blockId, pageState.blocks)
            const updatedBlockState = 
                BlockReducer(blockState, blockAction)            
            return {
                ...pageState,
                blocks: 
                    replaceBlock(
                        blockId, updatedBlockState, pageState.blocks
                    )
            }
        //
        // Reduce page meta-data actions.
        //
        case MODIFIED:
            const { modifiedDate } = pageAction.payload
            return {
                ...pageState,
                modifiedDate
            }
        case PUBLISH:
            const { publishedDate } = pageAction.payload
            return {
                ...pageState,
                isDraft: false,
                modifiedDate: publishedDate,
                publishedDate
            }
        case UNPUBLISH:
            return {
                ...pageState,
                isDraft: true,
                modifiedDate: publishedDate,
                publishedDate: null
            }
        //
        // Reduce page type specific actions (if any).
        //
        default:
            const pageMap = getPageMap()
            const pageType = pageState.type
            const throwError = (msg) => {
                const errMsg = (
                    `Could not reduce page.\n` +
                    `${msg}\n` +
                    `[pageId=${pageState.id}]`
                )
                alert(errMsg)
                throw new Error(errMsg)
            }
            if (!pageType) {
                const msg = `No page type.`
                throwError(msg)
            }
            if (!pageMap.has(pageType)) {
                const msg = (
                    `Could not reduce page.\n` +
                    `Invalid page type [type=${pageType}].\n`
                )
                throwError(msg)
            }
            const pageRedux = pageMap.get(pageType).redux
            if (pageRedux) {
                const pageReducer = pageRedux.reducer
                return pageReducer(pageState, pageAction)
            }
            return pageState
    }
}


///////////
///////////


export const createActionFromPageAction = (pageId, pageAction) => ({
    type: PAGE_ACTION,
    payload: { pageId, pageAction }
})