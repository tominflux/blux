import React from 'react'
import { Link } from 'react-router-dom'
const path = require("path")

export default function PageLinkComponent(props) {
    const entity = props.contentState.getEntity(props.entityKey)
    const pageId = entity.getData().pageId
    const linkPath = path.join("/", pageId)
    return (
        <Link to={linkPath}>
            {props.children}
        </Link>
    )
}