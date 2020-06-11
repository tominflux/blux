import React from 'react'
import Tooltip from '../tooltip'
import './styles.css'


function Button(props) {
    //
    const PureButton = React.forwardRef(
        (props, ref) => (
            <button
                ref={ref}
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
                {tooltipElement}
            </button>
        )
    )
    //
    const ref = React.createRef()
    //
    const tooltipElement = (
        props.tooltip ? 
            <Tooltip targetRef={ref}>
                {props.tooltip}
            </Tooltip> : null
    )
    //
    return (<>
        <PureButton {...props} ref={ref} />
        {tooltipElement}
    </>)
}

export default Button