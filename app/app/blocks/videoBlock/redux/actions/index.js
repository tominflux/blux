import VIDEO_BLOCK_ACTION_TYPES from "../actionTypes";


const updateVideoSrc = newSrc => ({
    type: VIDEO_BLOCK_ACTION_TYPES.UPDATE_SRC,
    payload: { newSrc }
})

const VIDEO_BLOCK_ACTIONS = {
    updateVideoSrc
}

export default VIDEO_BLOCK_ACTIONS