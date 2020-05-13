import React from 'react'
import { inheritClasses } from '../../../misc'
import '../textbox/styles.css'

export default function Password(props) {
    return (
        <input
            className={inheritClasses(props, "blux-textbox")}
            type="password"
            placeholder={props.children}
            onChange={props.onChange}
        />   
    )
}