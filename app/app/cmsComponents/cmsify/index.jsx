import React from 'react'
import { isCMS, inheritClasses } from "../../misc"
import './styles.css'

export const cmsify = (component) => {
    const InnerComponent = component
    return (props) => {
        return (
            isCMS() ? 
                <InnerComponent 
                    {...props} 
                /> :
                null
        )
    }
}

export const hideable = (component) => {
    const InnerComponent = component
    return (props) => {
        return (
            <InnerComponent 
                className={
                    inheritClasses(
                        props, 
                        "blux-hideable" +
                        (props.show ? "" : " blux-hideable--hidden")
                    )
                }
                {...props} 
            /> 
        )
    }
}

export const hoverable = (component) => {
    const InnerComponent = component
    return (props) => {
        //State
        const [isHovering, setHovering] = React.useState(false)
        //Events
        const onMouseEnter = () => setHovering(true)
        const onMouseLeave = () => setHovering(false)
        //Render
        return (
            <InnerComponent
                hoverEvents={{
                    onMouseEnter: () => onMouseEnter(),
                    onMouseLeave: () => onMouseLeave()
                }}
                isHovering={isHovering}
                {...props}
            />
        )
    }
}