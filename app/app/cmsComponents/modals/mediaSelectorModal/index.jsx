import React from 'react'
import Modal from '../../abstract/modal'
import Button from '../../abstract/button'
import MediaNavigator from '../../navigators/mediaNavigator'
import { cmsify } from '../../cmsify'
import './styles.css'

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
                <Button
                    disabled={props.selected === null}
                    onClick={() => onConfirm()}
                    className="blux-media-selector-modal__confirm-button"
                >
                    OK
                </Button>
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
                canDelete={props.canDelete}
                canDrop={props.canDrop}
            />
        </Modal>
    )
}

export default cmsify(MediaSelectorModal)