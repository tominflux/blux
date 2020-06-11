import React from 'react'
import Modal from '../../abstract/modal'
import Button from '../../abstract/button'
import { cmsify } from '../../cmsify'
import './styles.css'

function ConfirmPromptModal(props) {
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={"Confirm"}
        >
            <p className="blux-confirm-modal__message">
                {props.children}
            </p>
            <div className="blux-confirm-modal__buttons-container">
                <Button
                    className="blux-confirm-modal__yes-button"
                    onClick={props.onConfirm}
                >
                    Yes
                </Button>
                <Button
                    className="blux-confirm-modal__no-button"
                    onClick={props.onCancel}
                >
                    No
                </Button>
            </div>
        </Modal>
    )
}

export default cmsify(ConfirmPromptModal)