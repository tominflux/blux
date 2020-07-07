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

const setPageLink = newPageLink => ({
    type: IMAGE_ACTION_TYPES.SET_PAGE_LINK,
    payload: { newPageLink }
})

const setExternalLink = newExternalLink => ({
    type: IMAGE_ACTION_TYPES.SET_EXTERNAL_LINK,
    payload: { newExternalLink }
})


/////////
/////////


const IMAGE_ACTIONS = {
    updateImageSrc, 
    updateImageAlt,
    setPageLink,
    setExternalLink
}

export default IMAGE_ACTIONS