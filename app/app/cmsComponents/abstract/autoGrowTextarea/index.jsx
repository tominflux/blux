import React from 'react'
import './styles.css'
import { inheritClasses } from '../../../misc'

export default function AutoGrowTextArea(props) {
    //Ref
    const ref = React.createRef()
    //State 
    const [absoluteHeight, setAbsoluteHeight] = React.useState(null)
    //Events
    const onTextAreaKeyUp = (e) => {
        setAbsoluteHeight(`0px`)
        if (props.onKeyUp) {
            props.onKeyUp(e)
        }
    }
    //Effects
    React.useEffect(() => {
        const element = ref.current
        if (element.clientHeight < element.scrollHeight) {
            setAbsoluteHeight(`${element.scrollHeight}px`)
        }
    })
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
            ref={ref}
            className={inheritClasses(props, "blux-autogrow-textarea")}
            rows={props.rows || 1}
            cols={props.cols || 22}
            style={processedStyle}
            onKeyUp={(e) => onTextAreaKeyUp(e)}
            {...inheritedProps}
            value={props.children}
        />
    )
}