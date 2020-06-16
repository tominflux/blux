import { PAGE_ACTION } from "../../../../redux/actionTypes"
import { BLOCK_ACTION } from "../../../../page/redux/actionTypes"

/**
 * Creates an absolute action from a block action.
 * Block actions are relative to a given block.
 * Absolute actions on blocks require a page ID and block ID
 * to know which block in the app's state to update.
 */
export const createBlockAction = (pageId, blockId, blockAction) => ({
    type: PAGE_ACTION,
    payload: {
        pageId,
        pageAction: {
            type: BLOCK_ACTION,
            payload: {
                blockId,
                blockAction
            }
        }
    }
})