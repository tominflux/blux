import React from 'react'
import Button from '../../abstract/button'
import './styles.css'
const path = require("path")

export default function SelectButton(props) {
    const onClick = (props) => {
        const confirmedPath = path.join(
            props.navigation, props.selected
        )
        props.pageBrowserConfirm(confirmedPath)
    }
    return (
        <Button
            disabled={(props.selected === null)}
            onClick={()=>onClick(props)}
            className="blux-select-button"
        >
            OK
        </Button>
    )
}