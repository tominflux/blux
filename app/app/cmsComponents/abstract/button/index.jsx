import React from 'react'
import Tooltip from '../tooltip'
import './styles.css'

const _Button = React.forwardRef(
    (forwardProps, forwardRef) => (
        <button
            ref={forwardRef}
            type={forwardProps.type || "button"}
            className={
                "blux-button" + (
                    (forwardProps.disabled === true) ? 
                        " blux-button--disabled" : ""
                ) + (
                    (forwardProps.className) ? 
                        " " + forwardProps.className : ""
                )
            }
            style={forwardProps.style}
            onClick={forwardProps.onClick}
        >
            {forwardProps.children}
        </button>
    )
)

function Button(props) {
    //Ref
    const ref = React.createRef()
    //Constants
    const tooltipElement = (
        props.tooltip ? 
            <Tooltip targetRef={ref}>
                {props.tooltip}
            </Tooltip> : null
    )
    //Render
    return (<>
        <_Button 
            {...props} 
            ref={ref} 
        />
        {tooltipElement}
    </>)
}

export default Button