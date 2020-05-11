import { getBlockMap } from '../../../blockMap'

/**
 * Creates a five character random ID.
 */
function newId() {
    const random = Math.random()
    const randomString = random.toString(36).substr(2)
    const alphaNumeric = randomString.replace(/[^0-z]+/g, '')
    const fiveCharacters = alphaNumeric.substr(0, 5)
    const id = fiveCharacters
    return id
}

/**
 * The initial state for any abstract block.
 * (Only to be used as part of creating a realised state
 * for a non-abstract block.)
 */
export const newBlockInitialState = (type) => ({
    id: newId(), type
})

/**
 * Combines multiple block reducers into one.
 */
const combineBlockReducers = (blockReducers) => (
    (blockState, blockAction) => {
        let newBlockState = blockState
        for (let blockReducer of blockReducers) {
            newBlockState = blockReducer(
                newBlockState, blockAction
            )
        }
        return newBlockState
    }
)

/**
 * Processes block actions on a block state.
 * @param {*} blockState 
 * @param {*} blockAction 
 */
export default function BlockReducer(
    blockState, blockAction
) {
    const blockMap = getBlockMap()
    const blockType = blockState.type
    const blockReducer = blockMap.get(blockType).redux.reducer
    return blockReducer(blockState, blockAction)
    /*
    const blockArray = [...blockMap.values()]
    const blockReducers = []
    for (const blockDescriptor of blockArray) {
        if (blockDescriptor.redux)
            if (blockDescriptor.redux.reducer)
                blockReducers.push(blockDescriptor.redux.reducer)
    }
    const comboReducer = combineBlockReducers(blockReducers)
    return comboReducer(blockState, blockAction)
    */
}