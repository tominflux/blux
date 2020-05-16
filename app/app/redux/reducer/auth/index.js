import { AUTH_CHECK_SEND, AUTH_CHECK_RECEIVE, AUTH_LOGIN_SEND, AUTH_LOGIN_RECEIVE } from "../../actionTypes";


const initialState = {
    checking: false,
    configured: null,
    loggingIn: false,
    authValid: null,
    sessionAvailable: null
}

export default function Auth(
    state = initialState, action
) {
    switch (action.type) {
        case AUTH_CHECK_SEND:
            return {
                ...state,
                checking: true
            }
        case AUTH_CHECK_RECEIVE:
            const { configured } = action.payload
            return {
                ...state,
                checking: false,
                configured
            }
        case AUTH_LOGIN_SEND:
            return {
                ...state,
                loggingIn: true,
                authValid: null,
                sessionAvailable: null
            }
        case AUTH_LOGIN_RECEIVE:
            const { authValid, sessionAvailable } = action.payload
            return {
                ...state,
                loggingIn: false,
                authValid: authValid,
                sessionAvailable: sessionAvailable
            }
        default:
            return state
    }
}