import React from 'react'
import {
    authCheckSend,
    authCheckReceive,
    authLoginSend,
    authLoginReceive
} from '../../redux/actions'
import FatalError from '../covers/fatalError'
import LoginModal from './loginModal'
import { connect } from 'react-redux'

export const AUTH_STATE = {
    NOT_YET_CHECKED: "NOT_YET_CHECKED",
    CHECKING: "CHECKING",
    NOT_CONFIGURED: "NOT_CONFIGURED",
    AWAITING_LOG_IN: "AWAITING_LOG_IN",
    LOGGING_IN: "LOGGING_IN",
    INVALID_AUTH: "INVALID_AUTH",
    SESSION_UNAVAILABLE: "SESSION_UNAVAILABLE",
    LOGGED_IN: "LOGGED_IN"
}

export const getAuthStateSummary = (state) => {
    console.log(state)
    if (state.checking === true) {
        return AUTH_STATE.CHECKING
    } else if (state.configured === null) {
        return AUTH_STATE.NOT_YET_CHECKED
    } else if (state.configured === false) {
        return AUTH_STATE.NOT_CONFIGURED
    } else if (state.loggingIn === true) {
        return AUTH_STATE.LOGGING_IN
    } else if (
        state.authValid === null &&
        state.sessionAvailable === null
    ) {
        return AUTH_STATE.AWAITING_LOG_IN
    } else if (state.authValid === false) {
        return AUTH_STATE.INVALID_AUTH
    } else if (
        state.sessionAvailable === false
    ) {
        return AUTH_STATE.SESSION_UNAVAILABLE
    } else if (
        state.authValid === true &&
        state.sessionAvailable === true
    ) {
        return AUTH_STATE.LOGGED_IN
    } else {
        throw new Error(
            "Authentication state could not be determined."
        )
    }
}

const mapStateToProps = (state) => ({
    stateSummary: getAuthStateSummary(state.Auth)
})

const mapDispatchToProps = {
    authCheckSend,
    authCheckReceive,
    authLoginSend,
    authLoginReceive
}

const API_PATH = "/api/auth"

function AuthCheck(props) {
    //Effects
    React.useEffect(() => {
        window.addEventListener("unload", () => alert("Bye bye."))
    })
    //Events
    const onCheckResponse = (configured) => {
        props.authCheckReceive(configured)
    }
    const onLoginSubmit = async (user, pass) => {
        props.authLoginSend()
        performLogin(user, pass)
    }
    const onLoginReceive = async (authValid, sessionAvailable) => {
        props.authLoginReceive(authValid, sessionAvailable)
    }
    //Functions
    const performCheck = async () => {
        props.authCheckSend()
        const response = await fetch(API_PATH)
        const { configured } = await response.json()
        onCheckResponse(configured)
    }
    const performLogin = async (user, pass) => {
        const requestBody = { user, pass }
        const requestJson = JSON.stringify(requestBody)
        const response = await fetch(
            API_PATH, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestJson
            }
        )
        const json = await response.json()
        const { authValid, sessionAvailable } = json
        onLoginReceive(authValid, sessionAvailable)
    }
    //
    switch (props.stateSummary) {
        case AUTH_STATE.NOT_YET_CHECKED:
            performCheck()
            return null
        case AUTH_STATE.CHECKING:
            return null
        case AUTH_STATE.NOT_CONFIGURED:
            return (
                <FatalError>
                    No authentication configured for this CMS.
                </FatalError>
            )
        case AUTH_STATE.LOGGING_IN:
            return (
                <LoginModal 
                    onSubmit={(user, pass) => onLoginSubmit(user, pass)}
                />
            )
        case AUTH_STATE.AWAITING_LOG_IN:
            return (
                <LoginModal 
                    onSubmit={(user, pass) => onLoginSubmit(user, pass)}
                />
            )
        case AUTH_STATE.INVALID_AUTH:
            return (
                <LoginModal 
                    onSubmit={(user, pass) => onLoginSubmit(user, pass)}
                />
            )
        case AUTH_STATE.SESSION_UNAVAILABLE:
            return (
                <FatalError>
                    A different session is currently active for this
                    CMS.
                </FatalError>
            )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AuthCheck)