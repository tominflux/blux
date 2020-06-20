import React from 'react'
import {
    authCheckSend,
    authCheckReceive,
    authLoginSend,
    authLoginReceive,
    authExpire
} from '../../redux/actions'
import FatalError from '../covers/fatalError'
import LoginModal from './loginModal'
import { connect } from 'react-redux'
import { AUTH_STATE } from '../../redux/reducer/auth'

const mapStateToProps = (state) => ({
    authState: state.Auth.authState
})

const mapDispatchToProps = {
    authCheckSend,
    authCheckReceive,
    authLoginSend,
    authLoginReceive,
    authExpire
}

const API_PATH = "/api/auth"

function AuthCheck(props) {
    //Events
    const onCheckResponse = (configured, validSession) => {
        props.authCheckReceive(configured, validSession)
        if (configured && validSession)
            props.onPass()
    }
    const onLoginSubmit = async (user, pass) => {
        props.authLoginSend()
        performLogin(user, pass)
    }
    const onLoginReceive = async (authValid) => {
        props.authLoginReceive(authValid)
        if (authValid) {
            props.onPass()
        } else {
            alert("Invalid credentials.")
        }
    }
    //Functions
    const performCheck = async () => {
        props.authCheckSend()
        const response = await fetch(API_PATH)
        if (!response.ok) {
            const msg = "Could not check if authenticated."
            alert(msg)
            throw new Error(msg)
        }
        const { configured, validSession } = await response.json()
        onCheckResponse(configured, validSession)
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
        if (!response.ok) {
            const msg = "Could not log-in."
            alert(msg)
            throw new Error(msg)
        }
        const json = await response.json()
        const { authValid } = json
        onLoginReceive(authValid)
    }
    //Effects 
    // - Routine Check (Every 30 seconds.)
    React.useEffect(() => {
        const interval = setInterval(
            () => {
                props.authExpire()
            },
            30 * 1000
        )
        return () => {
            if (interval)
                clearInterval(interval)
        }
    })
    //Render
    switch (props.authState) {
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