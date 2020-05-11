import { 
    CREATE_BLOCK, 
    DELETE_BLOCK, 
    BLOCK_ACTION, 
    MOVE_BLOCK_UP,
    MOVE_BLOCK_DOWN
} from "../actionTypes"
import BlockReducer from "../../../block/redux/reducer"
import { immutableInsert, immutableSwap } from "../../../misc"

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

export default function PageReducer(
    pageState, pageAction
) {
    switch (pageAction.type) {
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
                blocks: removeBlock(idToDelete, pageState.blocks)
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
            /*
            console.log(blockAction)
            console.log("BLOCK STATE")
            console.log(blockState)
            console.log("UPDATED BLOCK STATE")
            console.log(updatedBlockState)
            */
            return {
                ...pageState,
                blocks: 
                    replaceBlock(
                        blockId, updatedBlockState, pageState.blocks
                    )
            }
        default:
            return pageState
    }
}