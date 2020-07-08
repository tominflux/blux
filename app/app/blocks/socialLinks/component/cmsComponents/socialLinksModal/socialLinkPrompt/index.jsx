import React from 'react'
import Modal from '../../../../../../cmsComponents/abstract/modal'
import Select from '../../../../../../cmsComponents/abstract/select'
import { SOCIAL_LINK_TYPE } from '../../../../'
import FacebookIcon from '../../../socialLink/icon/facebookIcon'
import InstagramIcon from '../../../socialLink/icon/instagramIcon'
import MiscIcon from '../../../socialLink/icon/miscIcon'
import SeamlessTextbox from '../../../../../../cmsComponents/abstract/seamlessTextbox'
import Button from '../../../../../../cmsComponents/abstract/button'
import './styles.css'

export default function SocialLinkPrompt(props) {
    //State
    const [type, setType] = React.useState(null)
    const [url, setUrl] = React.useState(null)
    //Effects
    // - Confirm on enter press
    React.useEffect(() => {
        const onKeyDown = (e) => {
            if (!props.show)
                return
            if (e.key === "Enter") {
                props.onConfirm(type, url)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    })
    //Constants
    const selectOptions = [
        {
            value: SOCIAL_LINK_TYPE.FACEBOOK,
            icon: FacebookIcon,
            text: "Facebook"
        },
        {
            value: SOCIAL_LINK_TYPE.INSTAGRAM,
            icon: InstagramIcon,
            text: "Instagram"
        },
        {
            value: SOCIAL_LINK_TYPE.MISC,
            icon: MiscIcon,
            text: "Misc."
        }
    ]
    //Render
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading="Configure Social Link"
        >
            <div className="row blux-social-prompt__inputs-container">
                <div className="col-3 text-right">
                    <Select
                        options={selectOptions}
                        onChange={(value) => setType(value)}
                    />
                </div>
                <div className="col-9 text-left">
                    <SeamlessTextbox
                        placeholder="URL goes here..."
                        onChange={(e) => setUrl(e.target.value)}
                        autofocus
                    />
                </div>
            </div>
            <div className="blux-social-prompt__button-container">
                <Button
                    className="blux-social-prompt__ok-button"
                    onClick={() => props.onConfirm(type, url)}
                >
                    OK
                </Button>
            </div>
        </Modal>
    )
}