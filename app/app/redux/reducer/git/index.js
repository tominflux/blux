import { GIT_CHECK_SEND, GIT_CHECK_RECEIVE, GIT_INIT_SEND, GIT_INIT_RECEIVE } from "../../actionTypes";

const initialState = {
    checking: false,
    initialised: null,
    initialising: false
}

export default function Git(
    state = initialState, action
) {
    switch (action.type) {
        case GIT_CHECK_SEND:
            return {
                ...state,
                checking: true
            }
        case GIT_CHECK_RECEIVE:
            const { initialised } = action.payload
            return {
                ...state,
                checking: false,
                initialised
            }
        case GIT_INIT_SEND:
            return {
                ...state,
                initialising: true
            }
        case GIT_INIT_RECEIVE:
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