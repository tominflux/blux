import React from 'react'
import { connect } from 'react-redux'
import {
    pageBrowserHide,
    pageBrowserNavigate,
    pageBrowserReceive,
    pageBrowserFail,
    pageBrowserConfirm
} from '../../redux/actions'
import './styles.css'
import PageRowCollection from './pageRowCollection'
import SelectButton from './selectButton'
import Modal from '../abstract/modal'
const path = require("path")

export async function invokeNavigation(dispatchers, pagePath="") {
    dispatchers.pageBrowserNavigate(
        path.join("./", pagePath)
    )
    try {
        const response = await fetch(
            path.join("/api/page-browser/", pagePath)
        )
        const json = await response.json()
        dispatchers.pageBrowserReceive(json.contents)
    } catch (err) {
        console.error(
            "Could not retrieve pages...\n" + err
        )
    }
}

function onMount(props) {
    invokeNavigation(props)
}

const mapStateToProps = (state) => ({
    shown: state.PageBrowser.shown,
    files: state.PageBrowser.files,
    navigation: state.PageBrowser.navigation,
    selected: state.PageBrowser.selected
})

const mapDispatchToProps = {
    pageBrowserHide,
    pageBrowserNavigate,
    pageBrowserReceive,
    pageBrowserFail,
    pageBrowserConfirm
}

function PageBrowser(props) {
    //
    React.useEffect(() => {
        onMount(props)
    }, [])
    return (
        <Modal
            onClickAway={() => props.pageBrowserHide()}
            show={props.shown}
            heading={props.navigation}
        >
            <PageRowCollection 
                navigation={props.navigation}
                files={props.files}
            />
            <div className="blux-page-browser__select-div">
                <SelectButton
                    navigation={props.navigation}
                    selected={props.selected}
                    pageBrowserConfirm={props.pageBrowserConfirm}
                />
            </div>
        </Modal>
    )
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PageBrowser)