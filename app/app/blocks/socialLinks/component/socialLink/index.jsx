import React from 'react'
import SocialLinkIcon from './icon'


export default function SocialLink(props) {
    return (
        <a
            className="blux-social-links__link"
            href={props.url}
            target="_blank"
        >
            <SocialLinkIcon
                type={props.type}
            />
        </a>
    )
}