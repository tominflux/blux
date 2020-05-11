import React from 'react'
import { connect } from 'react-redux'
import {
    mediaBrowserHide,
    mediaBrowserNavigate,
    mediaBrowserReceive,
    mediaBrowserFail,
    mediaBrowserConfirm
} from '../../redux/actions'
import './styles.css'
import MediaRowCollection from './mediaRowCollection'
import SelectButton from './selectButton'
import Modal from '../abstract/modal'
const path = require("path")

export async function invokeNavigation(dispatchers, mediaPath="") {
    dispatchers.mediaBrowserNavigate(
        path.join("./", mediaPath)
    )
    try {
        const response = await fetch(
            path.join("/api/media/", mediaPath)
        )
        const json = await response.json()
        dispatchers.mediaBrowserReceive(json.contents)
    } catch (err) {
        console.error(
            "Could not retrieve files...\n" + err
        )
    }
}

function onMount(props) {
    invokeNavigation(props)
}

const mapStateToProps = (state) => ({
    shown: state.MediaBrowser.shown,
    files: state.MediaBrowser.files,
    navigation: state.MediaBrowser.navigation,
    selected: state.MediaBrowser.selected
})

const mapDispatchToProps = {
    mediaBrowserHide,
    mediaBrowserNavigate,
    mediaBrowserReceive,
    mediaBrowserFail,
    mediaBrowserConfirm
}

function MediaBrowser(props) {
    //
    React.useEffect(() => {
        onMount(props)
    }, [])
    return (
        <Modal
            onClickAway={() => props.mediaBrowserHide()}
            show={props.shown}
            heading={props.navigation}
        >
            <MediaRowCollection 
                navigation={props.navigation}
                files={props.files}
            />
            <div className="blux-media-browser__select-div">
                <SelectButton
                    navigation={props.navigation}
                    selected={props.selected}
                    mediaBrowserConfirm={props.mediaBrowserConfirm}
                />
            </div>
        </Modal>
    )
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MediaBrowser)