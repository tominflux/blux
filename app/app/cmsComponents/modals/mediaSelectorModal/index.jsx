import React from 'react'
import Modal from '../../abstract/modal'
import Footer from './footer'
import MediaNavigator from '../../navigators/mediaNavigator'
import { cmsify } from '../../cmsify'

function MediaSelectorModal(props) {
    //State
    const [navigation, setNavigation] = React.useState("./")
    const [selected, setSelected] = React.useState(null)
    //Events
    const onNavigate = (navigation) => {
        setNavigation(navigation)
    }
    const onSelect = (thumbProps) => {
        setSelected(thumbProps)
    }
    const onConfirm = () => {
        if (props.onConfirm)
            props.onConfirm(selected, navigation)
    }
    //
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={navigation}
            footer={
                <Footer
                    confirmDisable={props.selected === null}
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
            />
        </Modal>
    )
}

export default cmsify(MediaSelectorModal)