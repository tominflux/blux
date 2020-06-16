import BLOG_BROWSER_ACTION_TYPES from "../actionTypes";
import { newBlockInitialState } from "../../../../block/block/redux/reducer";


export const blogBrowserInitialState = () => ({
    ...newBlockInitialState("blog-browser"),
    postsFolder: null
})


export default function BlogBrowserReducer(state, action) {
    switch (action.type) {
        case BLOG_BROWSER_ACTION_TYPES.SET_POSTS_FOLDER:
            const { newPostsFolder } = action.payload
            return {
                ...state,
                postsFolder: newPostsFolder
            }
    }
}