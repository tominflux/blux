import React from 'react'
import SocialLink from './socialLink'
import SocialLinksModal from './cmsComponents/socialLinksModal'
import ConfigureButton from '../../../cmsComponents/abstract/configureButton'
import { blockify } from '../../blockify'
import './styles.css'


function _SocialLinksComponent(props) {
    const [showModal, setShowModal] = React.useState(false)
    //
    const getSocialLinks = () => (
        props.links.map(
            (link, index) => (
                <SocialLink
                    key={index}
                    url={link.url}
                    type={link.type}
                />
            )
        )
    )
    //
    return (<>
        <div className="blux-social-links">
            { getSocialLinks() }
        </div>
        <SocialLinksModal
            onClickAway={() => setShowModal(false)}
            blockId={props.id}
            links={props.links}
            show={showModal}
            //Redux Actions
            addLink={props.addLink}
            modifyLink={props.modifyLink}
            swapLinks={props.swapLinks}
            removeLink={props.removeLink}
        />
        <div className="blux-social-links__configure-container">
            <ConfigureButton
                className="blux-social-links__configure"
                onClick={() => setShowModal(true)}
                show={props.showCms}
                tooltip="Configure Social Links"
            />
        </div>
    </>)
}

const SocialLinksComponent = blockify(_SocialLinksComponent)

export default SocialLinksComponent