import { 
    STATIC_REPO_CHECK_SEND, 
    STATIC_REPO_CHECK_RECEIVE, 
    STATIC_REPO_INIT_SEND, 
    STATIC_REPO_INIT_RECEIVE 
} from "../../actionTypes";

const initialState = {
    checking: false,
    initialised: null,
    initialising: false
}

export default function StaticRepo(
    state = initialState, action
) {
    switch (action.type) {
        case STATIC_REPO_CHECK_SEND:
            return {
                ...state,
                checking: true
            }
        case STATIC_REPO_CHECK_RECEIVE:
            const { initialised } = action.payload
            return {
                ...state,
                checking: false,
                initialised
            }
        case STATIC_REPO_INIT_SEND:
            return {
                ...state,
                initialising: true
            }
        case STATIC_REPO_INIT_RECEIVE:
            const { successful } = action.payload
            return {
                ...state,
                initialised: successful,
                initialising: false
            }
        default:
            return state
    }
}

export const STATIC_REPO_STATE = {
    NOT_YET_CHECKED: "NOT_YET_CHECKED",
    CHECKING: "CHECKING",
    NEEDS_INITIALISING: "NEEDS_INITIALISING",
    INITIALISING: "INITIALISING",
    INITIALISED: "INITIALISED"
}

export const getStaticRepoStateSummary = (staticRepoReduxState) => {
    if (staticRepoReduxState.checking === true) 
        return STATIC_REPO_STATE.CHECKING
    else if (
        staticRepoReduxState.initialised === null
    )
        return STATIC_REPO_STATE.NOT_YET_CHECKED
    else if (
        staticRepoReduxState.initialised === false &&
        staticRepoReduxState.initialising === false
    )
        return STATIC_REPO_STATE.NEEDS_INITIALISING
    else if (
        staticRepoReduxState.initialised === false &&
        staticRepoReduxState.initialising === true
    ) 
        return STATIC_REPO_STATE.INITIALISING
    else if (
        staticRepoReduxState.initialised === true
    ) 
        return STATIC_REPO_STATE.INITIALISED
    else 
        throw new Error(
            "Static repo state summary could not be determined."
        )
}