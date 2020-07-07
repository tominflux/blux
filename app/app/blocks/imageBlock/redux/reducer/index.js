import IMAGE_ACTION_TYPES from "../actionTypes"
import { newBlockInitialState } from "../../../../block/block/redux/reducer"

export const newImageInitialState = () => ({
    ...newBlockInitialState("image"),
    src: null,
    alt: null,
    pageLink: null,
    externalLink: null
})

export default function ImageReducer(
    state, action
) {
    switch (action.type) {
        case IMAGE_ACTION_TYPES.UPDATE_SRC:
            const { newSrc } = action.payload
            return {
                ...state,
                src: newSrc
            }
        case IMAGE_ACTION_TYPES.UPDATE_ALT:
            const { newAlt } = action.payload
            return {
                ...state,
                alt: newAlt
            }
        case IMAGE_ACTION_TYPES.SET_PAGE_LINK:
            const { newPageLink } = action.payload
            return {
                ...state,
                pageLink: newPageLink,
                externalLink: null
            }
        case IMAGE_ACTION_TYPES.SET_EXTERNAL_LINK:
            const { newExternalLink } = action.payload
            return {
                ...state,
                pageLink: null,
                externalLink: newExternalLink
            }
        default:
            return state
    }
}