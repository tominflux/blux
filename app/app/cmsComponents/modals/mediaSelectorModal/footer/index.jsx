import React from 'react'
import Button from '../../../abstract/button'
import './styles.css'


export default function MediaSelectorFooter(props) {
    return (
        <div className="row">
            <div className="col-4">
                <Button
                    className="blux-media-selector-modal__upload-media-button"
                >
                    OK
                </Button>
                <Button
                    className="blux-media-selector-modal__new-folder-button"
                >
                    OK
                </Button>
            </div>
            <div className="col-4">
                <Button
                    disabled={props.confirmDisabled}
                    onClick={props.onConfirm}
                    className="blux-media-selector-modal__confirm-button"
                >
                    OK
                </Button>
            </div>
            <div className="col-4">
            
            </div>
        </div>
    )
}