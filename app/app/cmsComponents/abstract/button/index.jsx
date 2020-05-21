import React from 'react'
import './styles.css'


export default function Button(props) {
    return (
        <button
            type={props.type || "button"}
            className={
                "blux-button" + (
                    (props.disabled === true) ? 
                        " blux-button--disabled" : ""
                ) + (
                    (props.className) ? 
                        " " + props.className : ""
                )
            }
            style={props.style}
            onClick={(e)=>props.onClick(e)}
        >
            {props.children}
        </button>
    )
}