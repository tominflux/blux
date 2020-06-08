import BLOG_PAGE_ACTION_TYPES from "../actionTypes"
import pageInitialState from "../../../../page/redux/initialState"

export const blogPageInitialState = () => ({
    ...pageInitialState("blog"),
    title: "Untitled Post",
    imgSrc: null,
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
        default:
            return state
    }
}