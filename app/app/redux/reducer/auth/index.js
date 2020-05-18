import { AUTH_CHECK_SEND, AUTH_CHECK_RECEIVE, AUTH_LOGIN_SEND, AUTH_LOGIN_RECEIVE } from "../../actionTypes";


const initialState = {
    //AUTH CHECK (GET)
    checking: false,
    configured: null,
    validSession: null,
    //LOG IN (POST)
    loggingIn: false,
    authValid: null,
}

export default function Auth(
    state = initialState, action
) {
    switch (action.type) {
        case AUTH_CHECK_SEND:
            return {
                ...state,
                checking: true,
                validSession: null
            }
        case AUTH_CHECK_RECEIVE:
            const { configured, validSession } = action.payload
            return {
                ...state,
                checking: false,
                configured,
                validSession
            }
        case AUTH_LOGIN_SEND:
            return {
                ...state,
                loggingIn: true,
                authValid: null
            }
        case AUTH_LOGIN_RECEIVE:
            const { authValid } = action.payload
            return {
                ...state,
                loggingIn: false,
                authValid: authValid
            }
        default:
            return state
    }
}