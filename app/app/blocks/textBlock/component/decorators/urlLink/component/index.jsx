import React from 'react'

export default function UrlLinkComponent(props) {
    const entity = props.contentState.getEntity(props.entityKey)
    const url = entity.getData().url
    return (
        <a
            href={url}
            target="_blank"
        >
            {props.children}
        </a>
    )
}