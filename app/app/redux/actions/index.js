import { 
    //PAGE COLLECTION
    PAGE_ACTION, 
    FETCH_PAGES, 
    RECEIVE_PAGES, 
    //MEDIA BROWSER
    MEDIA_BROWSER_SHOW,
    MEDIA_BROWSER_HIDE,
    MEDIA_BROWSER_NAVIGATE,
    MEDIA_BROWSER_RECEIVE,
    MEDIA_BROWSER_FAIL,
    MEDIA_BROWSER_SELECT,
    MEDIA_BROWSER_CONFIRM,
    MEDIA_BROWSER_ACKNOWLEDGE,
    //PAGE BROWSER
    PAGE_BROWSER_SHOW,
    PAGE_BROWSER_HIDE,
    PAGE_BROWSER_NAVIGATE,
    PAGE_BROWSER_RECEIVE,
    PAGE_BROWSER_FAIL,
    PAGE_BROWSER_SELECT,
    PAGE_BROWSER_CONFIRM,
    PAGE_BROWSER_ACKNOWLEDGE,
    //GIT CHECK
    STATIC_REPO_CHECK_SEND,
    STATIC_REPO_CHECK_RECEIVE,
    STATIC_REPO_INIT_SEND,
    STATIC_REPO_INIT_RECEIVE,
    AUTH_CHECK_SEND,
    AUTH_CHECK_RECEIVE,
    AUTH_LOGIN_SEND,
    AUTH_LOGIN_RECEIVE,
} from "../actionTypes";


/* PAGE COLLECTION */

export const fetchPages = (requestedPageIds) => ({
    type: FETCH_PAGES,
    payload: { requestedPageIds }
})

export const receivePages = (receivedPageStates) => ({
    type: RECEIVE_PAGES,
    payload: { receivedPageStates }
})

export const pageAction = (pageIndex, pageAction) => ({
    type: PAGE_ACTION,
    payload: {
        pageIndex,
        pageAction
    }
})


/////////
/////////
/////////


/* MEDIA BROWSER */

export const mediaBrowserShow = (referedBy) => ({
    type: MEDIA_BROWSER_SHOW,
    payload: {
        referedBy
    }
})

export const mediaBrowserHide = () => ({
    type: MEDIA_BROWSER_HIDE,
    payload: {}
})

export const mediaBrowserNavigate = (mediaPath) => ({
    type: MEDIA_BROWSER_NAVIGATE,
    payload: {
        mediaPath
    }
})

export const mediaBrowserReceive = (receivedFiles) => ({
    type: MEDIA_BROWSER_RECEIVE,
    payload: {
        receivedFiles
    }
})

export const mediaBrowserFail = () => ({
    type: MEDIA_BROWSER_FAIL,
    payload: {}
})

export const mediaBrowserSelect = (mediaName) => ({
    type: MEDIA_BROWSER_SELECT,
    payload: {
        mediaName
    }
})

export const mediaBrowserConfirm = (confirmedMediaPath) => ({
    type: MEDIA_BROWSER_CONFIRM,
    payload: {
        confirmedMediaPath
    }
})

export const mediaBrowserAcknowledge = () => ({
    type: MEDIA_BROWSER_ACKNOWLEDGE,
    payload: {}
})


/////////
/////////
/////////


/* PAGE BROWSER */

export const pageBrowserShow = (referedBy) => ({
    type: PAGE_BROWSER_SHOW,
    payload: {
        referedBy
    }
})

export const pageBrowserHide = () => ({
    type: PAGE_BROWSER_HIDE,
    payload: {}
})

export const pageBrowserNavigate = (pagePath) => ({
    type: PAGE_BROWSER_NAVIGATE,
    payload: {
        pagePath
    }
})

export const pageBrowserReceive = (receivedFiles) => ({
    type: PAGE_BROWSER_RECEIVE,
    payload: {
        receivedFiles
    }
})

export const pageBrowserFail = () => ({
    type: PAGE_BROWSER_FAIL,
    payload: {}
})

export const pageBrowserSelect = (pageName) => ({
    type: PAGE_BROWSER_SELECT,
    payload: {
        pageName
    }
})

export const pageBrowserConfirm = (confirmedPagePath) => ({
    type: PAGE_BROWSER_CONFIRM,
    payload: {
        confirmedPagePath
    }
})

export const pageBrowserAcknowledge = () => ({
    type: PAGE_BROWSER_ACKNOWLEDGE,
    payload: {}
})


/////////
/////////
/////////


export const staticRepoCheckSend = () => ({
    type: STATIC_REPO_CHECK_SEND,
    payload: {}
})

export const staticRepoCheckReceive = (initialised) => ({
    type: STATIC_REPO_CHECK_RECEIVE,
    payload: { initialised }
})

export const staticRepoInitSend = () => ({
    type: STATIC_REPO_INIT_SEND,
    payload: {}
})

export const staticRepoInitReceive = (successful) => ({
    type: STATIC_REPO_INIT_RECEIVE,
    payload: { successful }
})


/////////
/////////
/////////

export const authCheckSend = () => ({
    type: AUTH_CHECK_SEND,
    payload: {}
})

export const authCheckReceive = (configured) => ({
    type: AUTH_CHECK_RECEIVE,
    payload: { configured }
})

export const authLoginSend = () => ({
    type: AUTH_LOGIN_SEND,
    payload: {}
})

export const authLoginReceive = (authValid, sessionAvailable) => ({
    type: AUTH_LOGIN_RECEIVE,
    payload: { authValid, sessionAvailable }
})