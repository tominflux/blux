import React from 'react'
import Button from '../../../abstract/button'
import './styles.css'


export default function BlockGalleryFooter(props) {
    return (
        <div className="row align-items-center">
            <div className="col-5">

            </div>
            <div className="col-2">

            </div>
            <div className="col-5">
                <Button
                    disabled={props.confirmDisabled}
                    onClick={props.onConfirm}
                    className="blux-block-gallery__confirm-button"
                >
                    OK
                </Button>
            </div>
        </div>
    )
}