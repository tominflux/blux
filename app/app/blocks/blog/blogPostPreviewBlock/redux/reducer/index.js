import { newBlockInitialState } from "../../../../../block/block/redux/reducer"
import BLOG_POST_PREVIEW_ACTION_TYPES from "../actionTypes"



export const blogPostPreviewInitialState = () => ({
    ...newBlockInitialState("blog-post-preview"),
    postPageId: null
})


export default function BlogPostPreviewReducer(state, action) {
    switch (action.type) {
        case BLOG_POST_PREVIEW_ACTION_TYPES.UPDATE_POST_PAGE_ID:
            const { newPostPageId } = action.payload
            return {
                ...state,
                postPageId: newPostPageId
            }
        default:
            return state
    }
}