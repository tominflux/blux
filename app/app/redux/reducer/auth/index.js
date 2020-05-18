import { AUTH_CHECK_SEND, AUTH_CHECK_RECEIVE, AUTH_LOGIN_SEND, AUTH_LOGIN_RECEIVE } from "../../actionTypes";


export const AUTH_STATE = {
    LOGGED_OUT: "LOGGED_OUT",
    CHECKING: "CHECKING",
    NOT_CONFIGURED: "NOT_CONFIGURED",
    AWAITING_LOG_IN: "AWAITING_LOG_IN",
    LOGGING_IN: "LOGGING_IN",
    INVALID_AUTH: "INVALID_AUTH",
    LOGGED_IN: "LOGGED_IN"
}

const initialState = {
    authState: AUTH_STATE.LOGGED_OUT
}

export default function Auth(
    state = initialState, action
) {
    switch (action.type) {
        case AUTH_CHECK_SEND:
            return {
                ...state,
                authState: AUTH_STATE.CHECKING
            }
        case AUTH_CHECK_RECEIVE:
            const { configured, validSession } = action.payload
            console.log(configured)
            console.log(validSession)
            if (configured) {
                return {
                    ...state,
                    authState: (
                        validSession ? 
                            AUTH_STATE.LOGGED_IN :
                            AUTH_STATE.AWAITING_LOG_IN
                    )
                }
            } else {
                return {
                    ...state,
                    authState: AUTH_STATE.NOT_CONFIGURED
                }
            }
        case AUTH_LOGIN_SEND:
            return {
                ...state,
                authState: AUTH_STATE.LOGGING_IN
            }
        case AUTH_LOGIN_RECEIVE:
            const { authValid } = action.payload
            return {
                ...state,
                authState: (
                    authValid ? 
                        AUTH_STATE.LOGGED_IN :
                        AUTH_STATE.INVALID_AUTH
                )
            }
        default:
            return state
    }
}