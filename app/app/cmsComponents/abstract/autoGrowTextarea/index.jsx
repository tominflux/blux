import React from 'react'
import './styles.css'
import { inheritClasses } from '../../../misc'

export default function AutoGrowTextArea(props) {
    //State 
    const [absoluteHeight, setAbsoluteHeight] = React.useState(null)
    //Events
    const onTextAreaKeyUp = (e) => {
        const element = e.target
        if (element.clientHeight < element.scrollHeight) {
            setAbsoluteHeight(`${element.scrollHeight}px`)
        }
        if (props.onKeyUp) {
            props.onKeyUp(e)
        }
    }
    //
    const {
        className,
        style,
        rows,
        cols,
        onKeyUp,
        ...inheritedProps
    } = props
    //
    const processedStyle = {
        ...(style ? style : {}),
        height: absoluteHeight
    }
    return (
        <textarea
            className={inheritClasses(props, "blux-autogrow-textarea")}
            rows={props.rows || 1}
            cols={props.cols || 22}
            style={processedStyle}
            onKeyUp={(e) => onTextAreaKeyUp(e)}
            {...inheritedProps}
        >
            {props.children}
        </textarea>
    )
}