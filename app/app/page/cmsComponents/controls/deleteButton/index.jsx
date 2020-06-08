import React from 'react'
import Button from '../../../../cmsComponents/abstract/button'
import './styles.css'


export default function DeleteButton(props) {
    return (
        <Button
            className="blux-delete-page"
            onClick={props.onClick}
        >
            Delete Page
        </Button>
    )
}