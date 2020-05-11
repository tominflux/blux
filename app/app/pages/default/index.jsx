import React from 'react'

export default function DefaultPage(props) {
    const title = props.title ? (
        <h1>
            { props.title }
        </h1>
    ) : null
    return (
        <div className="container">
            { title }
            { props.children }
        </div>
    )
}