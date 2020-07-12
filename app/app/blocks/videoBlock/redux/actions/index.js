import VIDEO_ACTION_TYPES from "../actionTypes";


const setLocalSrc = newLocalSrc => ({
    type: VIDEO_ACTION_TYPES.SET_LOCAL_SRC,
    payload: { newLocalSrc }
})
const setEmbedSrc = newEmbedSrc => ({
    type: VIDEO_ACTION_TYPES.SET_EMBED_SRC,
    payload: { newEmbedSrc }
})


const VIDEO_ACTIONS = {
    setLocalSrc,
    setEmbedSrc
}

export default VIDEO_ACTIONS