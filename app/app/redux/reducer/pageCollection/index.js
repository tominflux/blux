import PageReducer from "../../../page/redux/reducer"
import { 
    FETCH_PAGES, 
    RECEIVE_PAGES, 
    PAGE_ACTION 
} from "../../actionTypes"


const initialState = {
    pages: null,
    requestedPageIds: [],
    activeRequest: null
}

export const getPageById = (id, pages) => (
    pages.filter(
        page => (page.id === id)
    )[0] || null
)

/*
export const getPageIndexFromId = (id, pages) => (
    pages.indexOf(getPageById(id, pages))
)
*/

const removePage = (id, pages) => (
    pages.filter(
        page => (page.id !== id)
    )
)

const addPage = (newPage, pages) => [
    ...pages, newPage
]

const replacePage = (id, newPage, pages) => [
    ...addPage(
        newPage,
        removePage(id, pages)
    )
]

export default function PageCollection(
    state = initialState, action 
) {
    switch (action.type) {
        case FETCH_PAGES:
            const { requestedPageIds } = action.payload
            return {
                ...state,
                activeRequest: true,
                requestedPageIds
            }
        case RECEIVE_PAGES:
            const { receivedPageStates } = action.payload
            return {
                ...state,
                pages: receivedPageStates,
                activeRequest: false,
                requestedPageIds: []
            }
        case PAGE_ACTION:
            const { pageId, pageAction } = action.payload
            const pageState = getPageById(pageId, state.pages)
            const newPageState = 
                PageReducer(pageState, pageAction)
            return {
                ...state,
                pages: replacePage(pageId, newPageState, state.pages)
            }
        default:
            return state
    }
}