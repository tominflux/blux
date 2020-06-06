import React from 'react'


export default function LoadingPageComponent(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}