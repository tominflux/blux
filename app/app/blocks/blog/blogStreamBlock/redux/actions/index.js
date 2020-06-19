import BLOG_STREAM_ACTION_TYPES from "../actionTypes"

const setPostsFolder = (newPostsFolder) => ({
    type: BLOG_STREAM_ACTION_TYPES.SET_POSTS_FOLDER,
    payload: { newPostsFolder }
})

const BLOG_STREAM_ACTIONS = {
    setPostsFolder
}

export default BLOG_STREAM_ACTIONS