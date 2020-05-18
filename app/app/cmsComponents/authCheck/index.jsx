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
import { AUTH_STATE } from '../../redux/reducer/auth'

const mapStateToProps = (state) => ({
    authState: state.Auth.authState
})

const mapDispatchToProps = {
    authCheckSend,
    authCheckReceive,
    authLoginSend,
    authLoginReceive
}

const API_PATH = "/api/auth"

function AuthCheck(props) {
    //Events
    const onCheckResponse = (configured, validSession) => {
        props.authCheckReceive(configured, validSession)
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
        const json = await response.json()
        const { authValid, sessionAvailable } = json
        onLoginReceive(authValid, sessionAvailable)
    }
    //
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