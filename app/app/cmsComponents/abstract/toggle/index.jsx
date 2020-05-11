import React from 'react'
import './styles.css'

export default function Toggle(props) {
    return (
        <div 
            className={
                "blux-toggle" + (props.isToggled() ?
                    " blux-toggle--toggled" : ""
                )
            }
            onMouseDown={(e) => {
                e.preventDefault()
                props.toggle()
            }}
        >
            <div className="blux-toggle__symbol">
                {props.children}
            </div>
        </div>
    )
}