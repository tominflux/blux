import { newBlockInitialState } from "../../../../block/block/redux/reducer";
import VIDEO_ACTION_TYPES from "../actionTypes";

export const BLOCK_TYPE_VIDEO = "video"

export const videoInitialState = () => ({
    ...newBlockInitialState(BLOCK_TYPE_VIDEO),
    src: null,
    alt: null
})

export default function VideoReducer(
    state, action
) {
    switch (action.type) {
        case VIDEO_ACTION_TYPES.UPDATE_SRC:
            const { newSrc } = action.payload
            return {
                ...state,
                src: newSrc
            }
        default:
            return state
    }
}