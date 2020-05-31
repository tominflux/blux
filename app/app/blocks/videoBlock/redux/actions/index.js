import VIDEO_ACTION_TYPES from "../actionTypes";


const updateVideoSrc = newSrc => ({
    type: VIDEO_ACTION_TYPES.UPDATE_SRC,
    payload: { newSrc }
})

const VIDEO_ACTIONS = {
    updateVideoSrc
}

export default VIDEO_ACTIONS