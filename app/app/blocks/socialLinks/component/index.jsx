import React from 'react'
import { blockify } from '../../blockify'
import SocialLink from './socialLink'

function _SocialLinksComponent(props) {
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
    return (
        <div class="blux-social-links">
            { getSocialLinks() }
        </div>
    )
}

const SocialLinksComponent = blockify(_SocialLinksComponent)

export default SocialLinksComponent