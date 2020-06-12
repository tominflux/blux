import React from 'react'
import Modal from '../../abstract/modal'
import SeamlessTextbox from '../../abstract/seamlessTextbox'
import Button from '../../abstract/button'
import { cmsify } from '../../cmsify'
import './styles.css'

function UrlPromptModal(props) {
    //
    const [url, setUrl] = React.useState(null)
    //
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={"Enter URL"}
        >
            <div className="blux-url-modal__textbox-container">
                <SeamlessTextbox
                    placeholder="URL goes here..."
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className="blux-url-modal__button-container">
                <Button
                    className="blux-url-modal__ok-button"
                    onClick={() => props.onConfirm(url)}
                >
                    OK
                </Button>
            </div>
        </Modal>
    )
}

export default cmsify(UrlPromptModal)