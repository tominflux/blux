import { newBlockInitialState } from "../../../../block/redux/reducer";
import VIDEO_BLOCK_ACTION_TYPES from "../actionTypes";

export const BLOCK_TYPE_VIDEO = "video"

export const videoBlockInitialState = () => ({
    ...newBlockInitialState(BLOCK_TYPE_VIDEO),
    src: null,
    alt: null
})

export default function VideoBlockReducer(
    state, action
) {
    switch (action.type) {
        case VIDEO_BLOCK_ACTION_TYPES.UPDATE_SRC:
            const { newSrc } = action.payload
            return {
                ...state,
                src: newSrc
            }
        default:
            return state
    }
}