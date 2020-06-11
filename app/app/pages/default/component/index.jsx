import React from 'react'
import './styles.css'

export default function DefaultPageComponent(props) {
    return (
        <div className="blux-default-page">
            { props.children }
        </div>
    )
}