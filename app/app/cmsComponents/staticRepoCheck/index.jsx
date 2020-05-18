import React from 'react'
import { connect } from 'react-redux'
import {
    staticRepoCheckSend,
    staticRepoCheckReceive,
    staticRepoImportSend,
    staticRepoImportReceive
} from '../../redux/actions'
import { STATIC_REPO_STATE } from '../../redux/reducer/staticRepo'
import ImportingCover from './importingCover'
import FatalError from '../covers/fatalError'

const mapStateToProps = (state) => ({
    staticRepoState: state.StaticRepo.staticRepoState
})

const mapDispatchToProps = {
    staticRepoCheckSend,
    staticRepoCheckReceive,
    staticRepoImportSend,
    staticRepoImportReceive
}

const API_PATH = "/api/static-repo"

function StaticRepoCheck(props) {
    //Events
    const onCheckResponse = (alreadyImported) => {
        props.staticRepoCheckReceive(alreadyImported)
        if (alreadyImported) {
            props.onPass()
        }
    }
    const onInitResponse = (successful) => {
        props.staticRepoImportReceive(successful)
        if (successful) {
            props.onPass()
        }
    }
    //Functions
    const performCheck = async () => {
        props.staticRepoCheckSend()
        const response = await fetch(API_PATH)
        const { isCloned } = await response.json()
        onCheckResponse(isCloned)
    }
    const performInit = async () => {
        props.staticRepoImportSend()
        const response = await fetch(
            API_PATH, { method: "POST"}
        )
        const successful = (response.status === 200)
        onInitResponse(successful)
    }
    //
    switch (props.staticRepoState) {
        case STATIC_REPO_STATE.NEEDS_CHECKING:
            performCheck()
            return null
        case STATIC_REPO_STATE.CHECKING:
            return null
        case STATIC_REPO_STATE.NEEDS_IMPORTING:
            performInit()
            return null
        case STATIC_REPO_STATE.IMPORTING:
            return (
                <ImportingCover />
            )
        case STATIC_REPO_STATE.IMPORTED:
            return null
        case STATIC_REPO_STATE.FAILED_IMPORT:
            return (
                <FatalError>
                    Failed to import static content.
                </FatalError>
            )
        default:
            throw new Error(
                `Unrecognised static repo state: ${props.staticRepoState}`
            )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(StaticRepoCheck)