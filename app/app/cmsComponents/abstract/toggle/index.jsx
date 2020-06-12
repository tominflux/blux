import React from 'react'
import './styles.css'
import Tooltip from '../tooltip'

export default function Toggle(props) {
    //
    const PureToggle = React.forwardRef(
        (props, ref) => (
            <div 
                ref={ref}
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
    return (<>
        <PureToggle {...props} ref={ref} />
        {tooltipElement}
    </>)
}