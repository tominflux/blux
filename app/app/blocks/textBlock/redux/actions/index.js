import TEXT_ACTION_TYPES from "../actionTypes";

const updateEditorState = (newEditorState) => ({
    type: TEXT_ACTION_TYPES.UPDATE_EDITOR_STATE,
    payload: { newEditorState }
})

const setAlignment = (newAlignmentState) => ({
    type: TEXT_ACTION_TYPES.SET_ALIGNMENT,
    payload: { newAlignmentState }
})

const TEXT_ACTIONS = {
    updateEditorState,
    setAlignment
}

export default TEXT_ACTIONS