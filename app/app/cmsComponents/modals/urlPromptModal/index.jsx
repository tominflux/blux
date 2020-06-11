import React from 'react'
import Modal from '../../abstract/modal'
import SeamlessTextbox from '../../abstract/seamlessTextbox'
import Button from '../../abstract/button'
import { cmsify } from '../../cmsify'
import './styles.css'

function UrlPromptModal(props) {
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={"Enter URL"}
        >
            <div className="blux-url-modal__textbox-container">
                <SeamlessTextbox
                    placeholder="URL goes here..."
                />
            </div>
            <div className="blux-url-modal__button-container">
                <Button
                    className="blux-url-modal__ok-button"
                >
                    OK
                </Button>
            </div>
        </Modal>
    )
}

export default cmsify(UrlPromptModal)