import  
    IMAGE_BLOCK_ACTION_TYPES
from "../actionTypes";


const updateImageSrc = newSrc => ({
    type: IMAGE_BLOCK_ACTION_TYPES.UPDATE_SRC,
    payload: { newSrc }
})

const updateImageAlt = newAlt => ({
    type: IMAGE_BLOCK_ACTION_TYPES.UPADTE_ALT,
    payload: { newAlt }
})

const IMAGE_BLOCK_ACTIONS = {
    updateImageSrc, updateImageAlt
}

export default IMAGE_BLOCK_ACTIONS