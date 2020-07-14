import React from 'react'
import Button from '../../../abstract/button'
import './styles.css'


export default function BlockOptionsButton(props) {
    //Render
    return(
        <Button
            className="blux-block-options__button"
            tooltip={props.tooltip}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}