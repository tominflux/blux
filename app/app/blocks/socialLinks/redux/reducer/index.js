import { newBlockInitialState } from "../../../../block/redux/reducer";
import SOCIAL_LINKS_ACTION_TYPES from "../actionTypes";
import { immutablePush, immutableReplace, immutableDelete } from "../../../../misc";



export const socialLinksInitialState = {
    ...newBlockInitialState("social-links"),
    links: []
}

export default function SocialLinksReducer(
    state, action
) {
    switch (action.type) {
        case SOCIAL_LINKS_ACTION_TYPES.ADD_LINK:
            const { newLinkType, newLinkUrl } = action.payload
            const newLink = { newLinkType, newLinkUrl }
            const linksWithLinkAdded = immutablePush(
                newLink, state.links
            )
            return {
                ...state,
                links: linksWithLinkAdded
            }
        case SOCIAL_LINKS_ACTION_TYPES.MODIFY_LINK:
            const {
                indexToModify, updatedLinkType, updatedLinkUrl 
            } = action.payload
            const modifiedLink = {
                updatedLinkType, updatedLinkUrl
            }
            const linksWithLinkModified = immutableReplace(
                modifiedLink, indexToModify, state.links
            )
            return {
                ...state,
                links: linksWithLinkModified
            }
        case SOCIAL_LINKS_ACTION_TYPES.REMOVE_LINK:
            const { indexToRemove } = action.payload
            const linksWithoutLinkRemoved = immutableDelete(
                indexToRemove, state.links
            )
            return {
                ...state,
                links: linksWithoutLinkRemoved
            }
        default: 
            return state
    }
}