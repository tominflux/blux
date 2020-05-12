import React from 'react'
import { connect } from 'react-redux'
import NeedsInitModal from './needsInitModal'

const mapStateToProps = (state) => ({
    checking: state.Git.checking,
    initialised: state.Git.initialised,
    initialising: state.Git.initialised
})

const VIEW_STATE = {
    CHECKING: "CHECKING",
    NEEDS_INITIALISING: "NEEDS_INITIALISING",
    INITIALISING: "INITIALISING",
    INITIALISED: "INTIALISED"
}

function GitCheck(props) {
    //Events
    const onCheckResponse = (isCloned) => {
        props.gitCheckReceive(isCloned)
    }
    const onInitSubmit = (user, pass) => {
        props.gitInitSend()
        fetch(
            "/api/git"
        )
    }
    //Functions
    const getViewState = () => {
        if (props.checking === true) 
            return VIEW_STATE.CHECKING
        if (
            !props.initialised &&
            props.initialising === false
        )
            return VIEW_STATE.NEEDS_INITIALISING
        if (
            !props.initialised &&
            props.initialising === true
        ) 
            return VIEW_STATE.INITIALISING
        if (
            props.initialised === true
        ) 
            return VIEW_STATE.INITIALISED
        throw new Error(
            "Could not determine Git state."
        )
    }
    const performCheck = async () => {
        props.getCheckSend()
        const response = await fetch("/api/git")
        const { isCloned } = await response.json()
        onCheckResponse(isCloned)
    }
    //

    //
    switch (getViewState()) {
        case VIEW_STATE.CHECKING:
            return null
        case VIEW_STATE.NEEDS_INITIALISING:
            return (
                <NeedsInitModal 
                    onSubmit={(user, pass) => onInitSubmit(user, pass)}
                />
            )
        case VIEW_STATE.INITIALISING:
            return null
        case VIEW_STATE.INITIALISED:
            return null
    }
}

export default connect(
    mapStateToProps, null
)(GitCheck)