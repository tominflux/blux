import BLOG_STREAM_ACTION_TYPES from "../actionTypes";
import { newBlockInitialState } from "../../../../../block/block/redux/reducer";


export const blogStreamInitialState = () => ({
    ...newBlockInitialState("blog-stream"),
    postsFolder: null
})


export default function BlogStreamReducer(state, action) {
    switch (action.type) {
        case BLOG_STREAM_ACTION_TYPES.SET_POSTS_FOLDER:
            const { newPostsFolder } = action.payload
            return {
                ...state,
                postsFolder: newPostsFolder
            }
    }
}