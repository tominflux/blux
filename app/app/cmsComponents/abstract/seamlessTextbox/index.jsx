import React from 'react'
import { inheritClasses } from '../../../misc'
import Textbox from '../textbox'
import './styles.css'

export default function SeamlessTextbox(props) {
    return (
        <Textbox
            className={inheritClasses(props, "blux-seamless-textbox")}
            onClick={props.onClick}
            onChange={props.onChange}
            onEnter={props.onEnter}
            readOnly={props.readOnly}
            autofocus={props.autofocus}
            placeholder={props.placeholder}
        >
            {props.children}
        </Textbox>
    )
}