import React from 'react'
import { SOCIAL_LINK_TYPE } from '../../../'
import FacebookIcon from './facebookIcon'
import InstagramIcon from './instagramIcon'
import MiscIcon from './miscIcon'


export default function SocialLinkIcon(props) {
    switch (props.type) {
        case SOCIAL_LINK_TYPE.FACEBOOK:
            return <FacebookIcon />
        case SOCIAL_LINK_TYPE.FACEBOOK: 
            return <InstagramIcon />
        case SOCIAL_LINK_TYPE.MISC:
            return <MiscIcon />
        default:
            throw new Error(
                `Invalid Social-Link-Type '${props.type}'.`
            )
    }
}