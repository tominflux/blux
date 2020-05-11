import { 
    CREATE_BLOCK, 
    DELETE_BLOCK,
    MOVE_BLOCK_UP,
    MOVE_BLOCK_DOWN
} from "../actionTypes"
import { PAGE_ACTION } from "../../../redux/actionTypes"


export const createBlock = (pageId, blockBeforeId, newBlockState) => ({
    type: PAGE_ACTION,
    payload: { 
        pageId, 
        pageAction: {
            type: CREATE_BLOCK,
            payload: { 
                blockBeforeId, newBlockState 
            }
        }
    }
})

export const deleteBlock = (pageId, idToDelete) => ({
    type: PAGE_ACTION,
    payload: { 
        pageId, 
        pageAction: {
            type: DELETE_BLOCK,
            payload: { idToDelete }
        }
    }
})

export const moveBlockUp = (pageId, idToMoveUp) => ({
    type: PAGE_ACTION,
    payload: { 
        pageId, 
        pageAction: {
            type: MOVE_BLOCK_UP,
            payload: { idToMoveUp }
        }
    }
})

export const moveBlockDown = (pageId, idToMoveDown) => ({
    type: PAGE_ACTION,
    payload: { 
        pageId, 
        pageAction: {
            type: MOVE_BLOCK_DOWN,
            payload: { idToMoveDown }
        }
    }
})