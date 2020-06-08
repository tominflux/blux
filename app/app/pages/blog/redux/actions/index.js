import BLOG_PAGE_ACTION_TYPES from "../actionTypes";


const setTitle = (newTitle) => ({
    type: BLOG_PAGE_ACTION_TYPES.SET_TITLE,
    payload: { newTitle }
})

const setImgSrc = (newImgSrc) => ({
    type: BLOG_PAGE_ACTION_TYPES.SET_IMG_SRC,
    payload: { newImgSrc }
})


/////////
/////////


const BLOG_PAGE_ACTIONS = {
    setTitle,
    setImgSrc
}

export default BLOG_PAGE_ACTIONS