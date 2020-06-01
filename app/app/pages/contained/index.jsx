import React from 'react'

export default function ContainedPage(props) {
    return (
        <div className="container">
            { props.children }
        </div>
    )
}