const { default: BLOG_POST_PREVIEW_ACTION_TYPES } = require("../actionTypes")


const updatePostPageId = (newPostPageId) => ({
    type: BLOG_POST_PREVIEW_ACTION_TYPES.UPDATE_POST_PAGE_ID,
    payload: { newPostPageId }
})

const BLOG_POST_PREVIEW_ACTIONS = {
    updatePostPageId
}

export default BLOG_POST_PREVIEW_ACTIONS