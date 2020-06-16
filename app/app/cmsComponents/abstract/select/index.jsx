import React from 'react'
import './styles.css'


export default function Select(props) {
    //Ref
    const innerContainerRef = React.createRef()
    //State
    const [isOpen, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(null)
    const [innerContainerHeight, setInnerContainerHeight] = React.useState(null)
    //Effects
    // - Observe inner-container height
    React.useEffect(() => {
        if (!innerContainerRef.current)
            return
        const newInnerContainerHeight = innerContainerRef.current.clientHeight
        if (newInnerContainerHeight !== innerContainerRef)
            setInnerContainerHeight(newInnerContainerHeight)
    })
    //Events
    const onChange = (index) => {
        setOpen(false)
        setSelectedIndex(index)
        const value = props.options[index].value
        props.onChange(value)
    }
    //Getters
    const getOption = (option, index) => (
        <div
            key={index}
            className="blux-select__option"
            onClick={() => onChange(index)}
        >
            {option.text}
        </div>
    )
    const getOptions = () => (
        props.options.map(
            (option, index) => getOption(option, index)
        )
    )
    const getSelectedOption = () => {
        const option = props.options[selectedIndex]
        return (
            <div 
                className="blux-select__selected"
                onClick={() => setOpen(!isOpen)}
            >
                {
                    (selectedIndex !== null) ? (
                            option.text
                        ) : (
                            props.placeholder || "Select..."
                        )
                }
            </div>
        )
    }
    //Render
    return (
        <div 
            className={
                "blux-select" + (
                    isOpen ? "" : " blux-select--closed"
                )
            }
        >
            { getSelectedOption() }
            <div 
                className={"blux-select__options-container"}
                style={{
                    height: (
                        isOpen ? 
                            `calc(${innerContainerHeight}px + 3.3pt)` : 
                            "0px"
                    )
                }}
            >
                <div
                    ref={innerContainerRef}
                >
                    { getOptions() }
                </div>
            </div>
        </div>
    )
}