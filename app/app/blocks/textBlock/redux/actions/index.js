import TEXT_BLOCK_ACTION_TYPES from "../actionTypes";

const updateEditorState = (newEditorState) => ({
    type: TEXT_BLOCK_ACTION_TYPES.UPDATE_EDITOR_STATE,
    payload: { newEditorState }
})

const setAlignment = (newAlignmentState) => ({
    type: TEXT_BLOCK_ACTION_TYPES.SET_ALIGNMENT,
    payload: { newAlignmentState }
})

const TEXT_BLOCK_ACTIONS = {
    updateEditorState,
    setAlignment
}

export default TEXT_BLOCK_ACTIONS