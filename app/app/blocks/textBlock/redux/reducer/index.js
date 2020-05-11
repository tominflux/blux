import TEXT_BLOCK_ACTION_TYPES, { TEXT_BLOCK_ALIGNMENT_STATES } from "../actionTypes"
import { newBlockInitialState } from "../../../../block/redux/reducer" 
import { EditorState, ContentBlock, ContentState } from "draft-js"

const initialBlock = () => (
    (new ContentBlock()).set("type", "paragraph")
)

export const initialContentState = () => (
    ContentState.createFromBlockArray(
        [ initialBlock() ]
    )
)

export const initialEditorState = () => (
    EditorState.createWithContent(
        initialContentState()
    )
)

export const newTextBlockInitialState = () => ({
    ...newBlockInitialState("text"),
    editorState: initialEditorState(),
    alignment: TEXT_BLOCK_ALIGNMENT_STATES.LEFT
})

export default function TextBlockReducer(
    state = initialState, action
) {
    switch (action.type) {
        case TEXT_BLOCK_ACTION_TYPES.UPDATE_EDITOR_STATE:
            const { newEditorState } = action.payload
            return {
                ...state,
                editorState: newEditorState
            }
        case TEXT_BLOCK_ACTION_TYPES.SET_ALIGNMENT:
            const { newAlignmentState } = action.payload
            return {
                ...state,
                alignment: newAlignmentState
            }
        default:
            return state
    }
}