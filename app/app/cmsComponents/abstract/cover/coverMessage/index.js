import React from 'react'

import './styles.css'
export default function CoverMessage(props) {
    return (
        <h1 className="blux-cover__message">
            {props.children}
        </h1>
    )
}