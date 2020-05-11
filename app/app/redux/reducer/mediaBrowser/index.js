import { 
    MEDIA_BROWSER_SHOW,
    MEDIA_BROWSER_HIDE,
    MEDIA_BROWSER_NAVIGATE, 
    MEDIA_BROWSER_RECEIVE,
    MEDIA_BROWSER_FAIL,
    MEDIA_BROWSER_SELECT,
    MEDIA_BROWSER_CONFIRM,
    MEDIA_BROWSER_ACKNOWLEDGE
} from "../../actionTypes";


const initialState = {
    referer: null,
    shown: false,
    navigation: null,
    files: [],
    awaiting: false,
    failed: false,
    selected: null,
    confirmed: null
}

export default function MediaBrowser(
    state = initialState, action
) {
    switch (action.type) {
        case MEDIA_BROWSER_SHOW: 
            const { referedBy } = action.payload
            return {
                ...state,
                referer: referedBy,
                shown: true
            }
        case MEDIA_BROWSER_HIDE:
            return {
                ...state, 
                referer: null,
                shown: false,
                confirmed: null
            }
        case MEDIA_BROWSER_NAVIGATE:
            const { mediaPath } = action.payload
            return {
                ...state,
                navigation: mediaPath,
                files: [],
                awaiting: true,
                failed: false,
                selected: null
            }
        case MEDIA_BROWSER_RECEIVE: 
            const { receivedFiles } = action.payload
            return {
                ...state,
                files: receivedFiles,
                awaiting: false,
                failed: false,
                selected: null
            }
        case MEDIA_BROWSER_FAIL:
            return {
                ...state,
                files: [],
                awaiting: false,
                failed: true,
                selected: null
            }
        case MEDIA_BROWSER_SELECT:
            const { mediaName } = action.payload
            return {
                ...state,
                selected: mediaName
            }
        case MEDIA_BROWSER_CONFIRM:
            const { confirmedMediaPath } = action.payload
            return {
                ...state,
                confirmed: confirmedMediaPath,
                shown: false
            }
        case MEDIA_BROWSER_ACKNOWLEDGE:
            if (state.shown) return state
            return {
                ...state,
                referer: null,
                confirmed: null
            }
        default: 
            return state
    }
}