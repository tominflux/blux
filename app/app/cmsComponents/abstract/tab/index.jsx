import React from 'react'
import './styles.css'

export default function Tab(props) {
    return (
        <button 
            type="button"
            className={
                "blux-tab" + (
                    (props.disabled === true) ? 
                        " blux-tab--disabled" : ""
                ) + (
                    (props.selected === true) ? 
                        " blux-tab--selected" : ""
                ) + (
                    props.className ? 
                        " " + props.className : ""
                )
            }
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}