import React from 'react'
import Button from '../../../../cmsComponents/abstract/button'
import './styles.css'


export default function PublishButton(props) {
    return (
        <Button
            className="blux-page-controls__publish"
            onClick={props.onClick}
        >
            {
                props.isDraft ? 
                    "Publish Page" : "Unpublish Page"
            }
        </Button>
    )
}