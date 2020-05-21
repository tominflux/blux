import React from 'react'
import Modal from '../../abstract/modal'
import Footer from './footer'
import MediaNavigator from '../../navigators/mediaNavigator'
import { cmsify } from '../../cmsify'
const path = require("path")

function MediaSelectorModal(props) {
    const [externalMostRecentFetch, setExternalMostRecentFetch]
        = React.useState(null)
    //State
    const [navigation, setNavigation] = React.useState("./")
    const [selected, setSelected] = React.useState(null)
    //Functions 
    const refreshNavigator = () => {
        setExternalMostRecentFetch(Date.now())
    }
    //Navigator Events
    const onNavigate = (navigation) => {
        setNavigation(navigation)
    }
    const onSelect = (thumbProps) => {
        setSelected(thumbProps)
    }
    //Modal Events
    const onConfirm = () => {
        if (props.onConfirm)
            props.onConfirm(selected, navigation)
    }
    const onCreateNewFolderClick = async () => {
        const requestPath = path.join(
            "/api/media", navigation
        )
        const response = await fetch(
            requestPath, 
            { method: "POST" }
        )
        if (!response.ok) {
            alert("Could not create new folder.")
        }
        refreshNavigator()
    }
    //
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={navigation}
            footer={
                <Footer
                    onUploadFileClick={() => onUploadFileClick()}
                    onCreateNewFolderClick={() => onCreateNewFolderClick()}
                    confirmDisabled={props.selected === null}
                    onConfirm={() => onConfirm()}
                />
            }
        >
            <MediaNavigator 
                onNavigate={
                    (navigation) => onNavigate(navigation)
                }
                onSelect={
                    (thumbProps) => onSelect(thumbProps)
                }
                mediaFilter={props.mediaFilter}
                canSelect={true}
                canRename={props.canRename}
                canDelete={props.canDelete}
                canDrop={props.canDrop}
                externalMostRecentFetch={externalMostRecentFetch}
            />
        </Modal>
    )
}

export default cmsify(MediaSelectorModal)