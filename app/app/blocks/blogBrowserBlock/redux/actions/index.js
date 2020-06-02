import BLOG_BROWSER_ACTION_TYPES from "../actionTypes"

const setPostsFolder = (newPostsFolder) => ({
    type: BLOG_BROWSER_ACTION_TYPES.SET_POSTS_FOLDER,
    payload: { newPostsFolder }
})

const BLOG_BROWSER_ACTIONS = {
    setPostsFolder
}

export default BLOG_BROWSER_ACTIONS