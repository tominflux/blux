import React from 'react'
import Modal from '../../abstract/modal'
import SeamlessTextbox from '../../abstract/seamlessTextbox'
import Button from '../../abstract/button'
import { cmsify } from '../../cmsify'
import './styles.css'
import { urlify } from '../../../misc'

function _UrlPromptModal(props) {
    //
    const [url, setUrl] = React.useState(null)
    //Functions
    const confirm = () => {
        props.onConfirm(url)
        setUrl(null)
    }
    //Effects
    // - Confirm on enter press.
    React.useEffect(() => {
        const onKeyDown = (e) => {
            if (!props.show)
                return
            if (e.key === "Enter") {
                confirm()
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    })
    //Events
    const onTextboxChange = (value) => {
        const newUrl = urlify(value)
        setUrl(newUrl)
    }
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
                    onChange={(value) => onTextboxChange(value)}
                    autofocus
                />
            </div>
            <div className="blux-url-modal__button-container">
                <Button
                    className="blux-url-modal__ok-button"
                    onClick={() => confirm()}
                >
                    OK
                </Button>
            </div>
        </Modal>
    )
}

const UrlPromptModal = cmsify(_UrlPromptModal)
export default UrlPromptModal