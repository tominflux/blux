import BLOG_PAGE_ACTION_TYPES from "../actionTypes";


const setTitle = (newTitle) => ({
    type: BLOG_PAGE_ACTION_TYPES.SET_TITLE,
    payload: { newTitle }
})

const setImgSrc = (newImgSrc) => ({
    type: BLOG_PAGE_ACTION_TYPES.SET_IMG_SRC,
    payload: { newImgSrc }
})

const hasModified = (modifiedDate) => ({
    type: BLOG_PAGE_ACTION_TYPES.HAS_MODIFIED,
    payload: { modifiedDate }
})

const publish = (publishedDate) => ({
    type: BLOG_PAGE_ACTION_TYPES.PUBLISH,
    payload: { publishedDate }
})

const unpublish = () => ({
    type: BLOG_PAGE_ACTION_TYPES.UNPUBLISH,
    payload: { }
})


/////////
/////////


const BLOG_PAGE_ACTIONS = {
    setTitle,
    setImgSrc,
    hasModified,
    publish,
    unpublish
}

export default BLOG_PAGE_ACTIONS