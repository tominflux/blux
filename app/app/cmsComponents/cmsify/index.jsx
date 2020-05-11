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