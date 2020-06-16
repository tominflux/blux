const { default: SERIES_ACTION_TYPES } = require("../actionTypes")

const createItem = (newItem) => ({
    type: SERIES_ACTION_TYPES.CREATE,
    payload: { newItem }
})

const updateItem = (updateIndex, updatedItem) => ({
    type: SERIES_ACTION_TYPES.UPDATE,
    payload: { updateIndex, updatedItem }
})

const swapItems = (swapIndexA, swapIndexB) => ({
    type: SERIES_ACTION_TYPES.SWAP,
    payload: { swapIndexA, swapIndexB }
})

const deleteItem = (deleteIndex) => ({
    type: SERIES_ACTION_TYPES.DELETE,
    payload: { deleteIndex }
})

const SERIES_ACTIONS = [
    createItem,
    updateItem,
    swapItems,
    deleteItem
]

export default SERIES_ACTIONS