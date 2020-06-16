const { default: SOCIAL_LINKS_ACTION_TYPES } = require("../actionTypes");


const addLink = (newLinkType, newLinkUrl) => ({
    type: SOCIAL_LINKS_ACTION_TYPES.ADD_LINK,
    payload: { newLinkType, newLinkUrl }
})

const modifyLink = (indexToModify, updatedLinkType, updatedLinkUrl) => ({
    type: SOCIAL_LINKS_ACTION_TYPES.MODIFY_LINK,
    payload: { 
        indexToModify, updatedLinkType, updatedLinkUrl 
    }
})

const swapLinks = (swapIndexA, swapIndexB) => ({
    type: SOCIAL_LINKS_ACTION_TYPES.SWAP_LINKS,
    payload: { swapIndexA, swapIndexB }
})

const removeLink = (indexToRemove) => ({
    type: SOCIAL_LINKS_ACTION_TYPES.REMOVE_LINK,
    payload: { indexToRemove }
})


/////////
/////////


const SOCIAL_LINKS_ACTIONS = {
    addLink, modifyLink, swapLinks, removeLink
}

export default SOCIAL_LINKS_ACTIONS