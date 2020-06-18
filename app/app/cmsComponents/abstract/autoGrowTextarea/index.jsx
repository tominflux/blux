import React from 'react'
import './styles.css'
import { inheritClasses } from '../../../misc'

export default function AutoGrowTextArea(props) {
    //Ref
    const ref = React.createRef()
    //State 
    const [absoluteHeight, setAbsoluteHeight] = React.useState(null)
    //Constants
    const {
        className,
        style,
        rows,
        cols,
        onKeyUp,
        onChange,
        children,
        ...inheritedProps
    } = props
    //Events
    const onTextAreaKeyUp = (e) => {
        setAbsoluteHeight(`0px`)
        if (onKeyUp) {
            onKeyUp(e)
        }
    }
    const onTextAreaChange = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }
    //Effects
    React.useEffect(() => {
        const element = ref.current
        if (element.clientHeight < element.scrollHeight) {
            setAbsoluteHeight(`${element.scrollHeight}px`)
        }
    })
    //Constants
    const readonlyProps = {
        readOnly: true,
        value: props.children
    }
    const editableProps = {
        readOnly: false,
        defaultValue: props.children
    }
    const dynamicProps = {
        ...(props.readOnly ? readonlyProps : editableProps)
    }
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
            onChange={(e) => onTextAreaChange(e)}
            {...inheritedProps}
            {...dynamicProps}
        />
    )
}