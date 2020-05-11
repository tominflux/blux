import React from 'react'
import './styles.css'

export default function WorkPage(props) {
    const title = props.title ? (
        <h1>
            { props.title }
        </h1>
    ) : null
    return (
        <div className="blux-work-page">
            { title }
            { props.children }
        </div>
    )
}