import { 
    STATIC_REPO_CHECK_SEND, 
    STATIC_REPO_CHECK_RECEIVE, 
    STATIC_REPO_IMPORT_SEND, 
    STATIC_REPO_IMPORT_RECEIVE 
} from "../../actionTypes";

export const STATIC_REPO_STATE = {
    NEEDS_CHECKING: "NEEDS_CHECKING",
    CHECKING: "CHECKING",
    NEEDS_IMPORTING: "NEEDS_IMPORTING",
    IMPORTING: "IMPORTING",
    IMPORTED: "IMPORTED",
    FAILED_IMPORT: "FAILED_IMPORT"
}

const initialState = {
    staticRepoState: STATIC_REPO_STATE.NEEDS_CHECKING
}

export default function StaticRepo(
    state = initialState, action
) {
    switch (action.type) {
        case STATIC_REPO_CHECK_SEND:
            return {
                ...state,
                staticRepoState: STATIC_REPO_STATE.CHECKING
            }
        case STATIC_REPO_CHECK_RECEIVE:
            const { alreadyImported } = action.payload
            return {
                ...state,
                staticRepoState: (
                    alreadyImported ? 
                        STATIC_REPO_STATE.IMPORTED :
                        STATIC_REPO_STATE.NEEDS_IMPORTING
                )
            }
        case STATIC_REPO_IMPORT_SEND:
            return {
                ...state,
                staticRepoState: STATIC_REPO_STATE.IMPORTING
            }
        case STATIC_REPO_IMPORT_RECEIVE:
            const { successful } = action.payload
            return {
                ...state,
                staticRepoState: (
                    successful ? 
                        STATIC_REPO_STATE.IMPORTED :
                        STATIC_REPO_STATE.FAILED_IMPORT
                )
            }
        default:
            return state
    }
}