import { 
    PAGE_BROWSER_SHOW,
    PAGE_BROWSER_HIDE,
    PAGE_BROWSER_NAVIGATE, 
    PAGE_BROWSER_RECEIVE,
    PAGE_BROWSER_FAIL,
    PAGE_BROWSER_SELECT,
    PAGE_BROWSER_CONFIRM,
    PAGE_BROWSER_ACKNOWLEDGE
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

export default function PageBrowser(
    state = initialState, action
) {
    switch (action.type) {
        case PAGE_BROWSER_SHOW: 
            const { referedBy } = action.payload
            return {
                ...state,
                referer: referedBy,
                shown: true
            }
        case PAGE_BROWSER_HIDE:
            return {
                ...state, 
                referer: null,
                shown: false,
                confirmed: null
            }
        case PAGE_BROWSER_NAVIGATE:
            const { pagePath } = action.payload
            return {
                ...state,
                navigation: pagePath,
                files: [],
                awaiting: true,
                failed: false,
                selected: null
            }
        case PAGE_BROWSER_RECEIVE: 
            const { receivedFiles } = action.payload
            return {
                ...state,
                files: receivedFiles,
                awaiting: false,
                failed: false,
                selected: null
            }
        case PAGE_BROWSER_FAIL:
            return {
                ...state,
                files: [],
                awaiting: false,
                failed: true,
                selected: null
            }
        case PAGE_BROWSER_SELECT:
            const { pageName } = action.payload
            return {
                ...state,
                selected: pageName
            }
        case PAGE_BROWSER_CONFIRM:
            const { confirmedPagePath } = action.payload
            return {
                ...state,
                confirmed: confirmedPagePath,
                shown: false
            }
        case PAGE_BROWSER_ACKNOWLEDGE:
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