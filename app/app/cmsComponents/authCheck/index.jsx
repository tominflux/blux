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
    LOGGED_OUT: "LOGGED_OUT",
    CHECKING: "CHECKING",
    NOT_CONFIGURED: "NOT_CONFIGURED",
    AWAITING_LOG_IN: "AWAITING_LOG_IN",
    LOGGING_IN: "LOGGING_IN",
    INVALID_AUTH: "INVALID_AUTH",
    LOGGED_IN: "LOGGED_IN"
}

const AUTH_STATE_CONDITIONS = new Map([
    [
        AUTH_STATE.LOGGED_OUT, (state) => (
            state.checking === false &&
            state.configured === null &&
            state.validSession === null &&
            state.loggingIn === false &&
            state.authValid === null
        )
    ],
    [
        AUTH_STATE.CHECKING, (state) => (
            state.checking === true &&
            state.configured === null &&
            state.validSession === null &&
            state.loggingIn === false &&
            state.authValid === null
        )
    ],
    [
        AUTH_STATE.NOT_CONFIGURED, (state) => (
            state.checking === false &&
            state.configured === false &&
            state.validSession === null &&
            state.loggingIn === false &&
            state.authValid === null
        )
    ],
    [
        AUTH_STATE.AWAITING_LOG_IN, (state) => (
            state.checking === false &&
            state.configured === true &&
            state.validSession === false &&
            state.loggingIn === false &&
            state.authValid === null
        )
    ],
    [
        AUTH_STATE.LOGGING_IN, (state) => (
            state.checking === false &&
            state.configured === true &&
            state.validSession === false &&
            state.loggingIn === true &&
            state.authValid === null
        )
    ],
    [
        AUTH_STATE.LOGGED_IN, (state) => (
            state.checking === false &&
            state.configured === true &&
            state.loggingIn === false &&
            (
                (
                    state.validSession === false &&
                    state.authValid === true
                ) || (
                    state.validSession === true &&
                    state.authValid === false
                )
            ) 
        )
    ],
    [
        AUTH_STATE.INVALID_AUTH, (state) => (
            state.checking === false &&
            state.configured === true &&
            state.validSession === false &&
            state.loggingIn === false &&
            state.authValid === false
        )
    ]
])

export const getAuthStateSummary = (state) => {
    for (const key of AUTH_STATE_CONDITIONS.keys()) {
        const condition = AUTH_STATE_CONDITIONS.get(key)
        const conditionResult = condition(state)
        if (conditionResult === true) {
            return key
        }
    }
    throw new Error(
        "Could not determine Auth State Summary."
    )
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
        case AUTH_STATE.LOGGED_OUT:
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
        case AUTH_STATE.LOGGED_IN:
            return null
        default: 
            throw new Error(
                "no recognised auth state summary."
            )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AuthCheck)