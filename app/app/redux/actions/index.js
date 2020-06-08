import { 
    //PAGE COLLECTION
    FETCH_PAGES, 
    RECEIVE_PAGES, 
    PAGE_REMOVED,
    PAGE_ACTION, 
    //GIT CHECK
    STATIC_REPO_CHECK_SEND,
    STATIC_REPO_CHECK_RECEIVE,
    STATIC_REPO_IMPORT_SEND,
    STATIC_REPO_IMPORT_RECEIVE,
    //AUTH CHECK
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

export const pageRemoved = (removedPageId) => ({
    type: PAGE_REMOVED,
    payload: { removedPageId }
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


export const staticRepoCheckSend = () => ({
    type: STATIC_REPO_CHECK_SEND,
    payload: {}
})

export const staticRepoCheckReceive = (alreadyImported) => ({
    type: STATIC_REPO_CHECK_RECEIVE,
    payload: { alreadyImported }
})

export const staticRepoImportSend = () => ({
    type: STATIC_REPO_IMPORT_SEND,
    payload: {}
})

export const staticRepoImportReceive = (successful) => ({
    type: STATIC_REPO_IMPORT_RECEIVE,
    payload: { successful }
})


/////////
/////////
/////////

export const authCheckSend = () => ({
    type: AUTH_CHECK_SEND,
    payload: {}
})

export const authCheckReceive = (configured, validSession) => ({
    type: AUTH_CHECK_RECEIVE,
    payload: { configured, validSession }
})

export const authLoginSend = () => ({
    type: AUTH_LOGIN_SEND,
    payload: {}
})

export const authLoginReceive = (authValid) => ({
    type: AUTH_LOGIN_RECEIVE,
    payload: { authValid }
})