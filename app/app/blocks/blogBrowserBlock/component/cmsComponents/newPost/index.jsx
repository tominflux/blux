import React from 'react'
import Button from '../../../../../cmsComponents/abstract/button'
import './styles.css'

export default function NewPost(props) {
    return (
        <div className="blux-blog-browser__new-post">
            <Button
                onClick={props.onClick}
            >
                Create New Post
            </Button>
        </div>
    )
}