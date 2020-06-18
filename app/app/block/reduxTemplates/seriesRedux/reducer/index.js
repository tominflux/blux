import SERIES_ACTION_TYPES from "../actionTypes"
import { 
    immutablePush, 
    immutableReplace, 
    immutableSwap, 
    immutableDelete 
} from "../../../../misc"


export const seriesInitialState = () => ({
    items: []
})

export default function SeriesReducer(state, action) {
    switch (action.type) {
        case SERIES_ACTION_TYPES.CREATE:
            const { newItem } = action.payload
            const itemsWithNewItem = immutablePush(
                newItem, state.items
            )
            return {
                ...state,
                items: itemsWithNewItem
            }
        case SERIES_ACTION_TYPES.UPDATE:
            const { updateIndex, updatedItem } = action.payload
            const itemsWithUpdatedItem = immutableReplace(
                updatedItem, updateIndex, state.items
            )
            return {
                ...state,
                items: itemsWithUpdatedItem
            }
        case SERIES_ACTION_TYPES.SWAP:
            const { swapIndexA, swapIndexB } = action.payload
            const itemsSwapped = immutableSwap(
                swapIndexA, swapIndexB, state.items
            )
            return {
                ...state,
                items: itemsSwapped
            }
        case SERIES_ACTION_TYPES.DELETE:
            const { deleteIndex } = action.payload
            const itemsWithoutRemovedItem = immutableDelete(
                deleteIndex, state.items
            )
            return {
                ...state,
                items: itemsWithoutRemovedItem
            }
        default:
            return state
    }
}