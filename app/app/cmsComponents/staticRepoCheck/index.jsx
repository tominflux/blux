import React from 'react'
import { connect } from 'react-redux'
import NeedsInitModal from './needsInitModal'
import {
    staticRepoCheckSend,
    staticRepoCheckReceive,
    staticRepoInitSend,
    staticRepoInitReceive
} from '../../redux/actions'
import { getStaticRepoStateSummary, STATIC_REPO_STATE } from '../../redux/reducer/staticRepo'
import ImportingCover from './importingCover'

const mapStateToProps = (state) => ({
    checking: state.StaticRepo.checking,
    initialised: state.StaticRepo.initialised,
    initialising: state.StaticRepo.initialising
})

const mapDispatchToProps = {
    staticRepoCheckSend,
    staticRepoCheckReceive,
    staticRepoInitSend,
    staticRepoInitReceive
}

const API_PATH = "/api/static-repo"

function StaticRepoCheck(props) {
    //Events
    const onCheckResponse = (isCloned) => {
        props.staticRepoCheckReceive(isCloned)
        if (isCloned) {
            props.onPass()
        }
    }
    const onInitSubmit = (user, pass) => {
        props.staticRepoInitSend()
        performInit(user, pass)
    }
    const onInitResponse = (successful) => {
        props.staticRepoInitReceive(successful)
        if (successful) {
            props.onPass()
        }
    }
    //Functions
    const getViewState = () => (
        getStaticRepoStateSummary(props)
    )
    const performCheck = async () => {
        props.staticRepoCheckSend()
        const response = await fetch(API_PATH)
        const { isCloned } = await response.json()
        onCheckResponse(isCloned)
    }
    const performInit = async (user, pass) => {
        const auth = { user, pass }
        const requestBody = JSON.stringify(auth) 
        const response = await fetch(
            API_PATH, 
            { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestBody
            }
        )
        const successful = (response.status === 200)
        onInitResponse(successful)
    }
    //
    switch (getViewState()) {
        case STATIC_REPO_STATE.NOT_YET_CHECKED:
            performCheck()
            return null
        case STATIC_REPO_STATE.CHECKING:
            return null
        case STATIC_REPO_STATE.NEEDS_INITIALISING:
            return (
                <NeedsInitModal 
                    show={true}
                    onSubmit={(user, pass) => onInitSubmit(user, pass)}
                />
            )
        case STATIC_REPO_STATE.INITIALISING:
            return (
                <ImportingCover />
            )
        case STATIC_REPO_STATE.INITIALISED:
            return null
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(StaticRepoCheck)