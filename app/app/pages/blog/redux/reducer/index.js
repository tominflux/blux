import BLOG_PAGE_ACTION_TYPES from "../actionTypes"

export const blogPageInitialState = () => ({
    type: "blog",
    title: "Untitled Post",
    draft: true,
    modifiedDate: Date.now(),
    publishedDate: null,
    imgSrc: null,
    blocks: []
})

export default function BlogPageReducer(state, action) {
    switch (action.type) {
        case BLOG_PAGE_ACTION_TYPES.SET_TITLE:
            const { newTitle } = action.payload
            return {
                ...state,
                title: newTitle
            }
        case BLOG_PAGE_ACTION_TYPES.SET_IMG_SRC:
            const { newImgSrc }  = action.payload
            return {
                ...state,
                imgSrc: newImgSrc
            }
        case BLOG_PAGE_ACTION_TYPES.HAS_MODIFIED:
            const { modifiedDate } = action.payload
            return {
                ...state,
                modifiedDate
            }
        case BLOG_PAGE_ACTION_TYPES.PUBLISH:
            const { publishedDate } = action.payload
            return {
                ...state,
                draft: false,
                publishedDate
            }
        case BLOG_PAGE_ACTION_TYPES.UNPUBLISH:
            return {
                ...state,
                draft: true,
                publishedDate: null
            }
        default:
            return state
    }
}