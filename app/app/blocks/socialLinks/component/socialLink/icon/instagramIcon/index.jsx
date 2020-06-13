import React from 'react'
import instagramIcon from './instagram.svg'


export default function InstagramIcon(props) {
    return (
        <img
            className="blux-social-links__link-icon"
            src={instagramIcon}
            alt={"Instagram Icon"}
        />
    )
}