import { 
    //
    CREATE_BLOCK, 
    DELETE_BLOCK,
    MOVE_BLOCK_UP,
    MOVE_BLOCK_DOWN,
    //
    MODIFIED,
    PUBLISH,
    UNPUBLISH
} from "../actionTypes"
import { PAGE_ACTION } from "../../../redux/actionTypes"


// BLOCKS

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



// PAGE


export const modified = (pageId, modifiedDate) => ({
    type: PAGE_ACTION,
    payload: {
        pageId,
        pageAction: {
            type: MODIFIED,
            payload: { modifiedDate }
        }
    }
})

export const publish = (pageId, publishedDate) => ({
    type: PAGE_ACTION,
    payload: {
        pageId,
        pageAction: {
            type: PUBLISH,
            payload: { publishedDate }
        }
    }
})

export const unpublish = (pageId) => ({
    type: PAGE_ACTION,
    payload: {
        pageId,
        pageAction: {
            type: UNPUBLISH,
            payload: { }
        }
    }
})