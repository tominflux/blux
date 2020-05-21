import React from 'react'
import { inheritClasses } from '../../../misc'
import './styles.css'

export default function Textbox(props) {
    const onKeyUp = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            e.target.blur()
        }
    }
    return (
        <input
            className={inheritClasses(props, "blux-textbox")}
            type="text"
            placeholder={props.placeholder}
            defaultValue={props.children}
            onClick={props.onClick}
            onChange={props.onChange}
            onBlur={props.onEnter}
            onKeyPress={(e) => onKeyUp(e)}
            readOnly={props.readOnly || false}
        />   
    )
}