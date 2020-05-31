import  
    IMAGE_ACTION_TYPES
from "../actionTypes";


const updateImageSrc = newSrc => ({
    type: IMAGE_ACTION_TYPES.UPDATE_SRC,
    payload: { newSrc }
})

const updateImageAlt = newAlt => ({
    type: IMAGE_ACTION_TYPES.UPADTE_ALT,
    payload: { newAlt }
})

const IMAGE_ACTIONS = {
    updateImageSrc, updateImageAlt
}

export default IMAGE_ACTIONS