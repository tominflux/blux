import { newBlockInitialState } from "../../../../block/block/redux/reducer";
import VIDEO_ACTION_TYPES from "../actionTypes";
import { VIDEO_SOURCE_TYPE } from "../..";

export const BLOCK_TYPE_VIDEO = "video"

export const videoInitialState = () => ({
    ...newBlockInitialState(BLOCK_TYPE_VIDEO),
    src: null,
    alt: null,
    srcType: null
})

export default function VideoReducer(
    state, action
) {
    switch (action.type) {
        case VIDEO_ACTION_TYPES.SET_LOCAL_SRC:
            const { newLocalSrc } = action.payload
            return {
                ...state,
                src: newLocalSrc,
                srcType: VIDEO_SOURCE_TYPE.LOCAL
            }
        case VIDEO_ACTION_TYPES.SET_EMBED_SRC:
            const { newEmbedSrc } = action.payload
            return {
                ...state,
                src: newEmbedSrc,
                srcType: VIDEO_SOURCE_TYPE.EMBED
            }
        default:
            return state
    }
}