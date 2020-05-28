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
    const readonlyProps = {
        readOnly: true,
        value: props.children
    }
    const editableProps = {
        readOnly: false,
        defaultValue: props.children
    }
    const dynamicProps = {
        ...(props.readOnly ? readonlyProps : editableProps)
    }
    return (
        <input
            className={inheritClasses(props, "blux-textbox")}
            type="text"
            placeholder={props.placeholder}
            onClick={props.onClick}
            onChange={props.onChange}
            onBlur={props.onEnter}
            onKeyPress={(e) => onKeyUp(e)}
            {...dynamicProps}
        />   
    )
}