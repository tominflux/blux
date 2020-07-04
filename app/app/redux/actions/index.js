import { 
    //PAGE COLLECTION
    FETCH_PAGES, 
    RECEIVE_PAGES, 
    PAGE_REMOVED,
    PAGE_ACTION, 
    //AUTH CHECK
    AUTH_CHECK_SEND,
    AUTH_CHECK_RECEIVE,
    AUTH_LOGIN_SEND,
    AUTH_LOGIN_RECEIVE,
    AUTH_EXPIRE,
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

export const authExpire = () => ({
    type: AUTH_EXPIRE,
    payload: {}
})