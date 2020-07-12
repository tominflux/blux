import React from 'react'
import iro from '@jaames/iro'
import './styles.css'
import { inheritClasses } from '../../../misc'
import { hideable } from '../../cmsify'

function _ColourPicker(props) {
    //Refs
    const containerRef = React.createRef(containerRef)
    const ref = React.createRef()
    //Events
    const onClick = (e) => {
        if (
            containerRef.current &&
            e.target === containerRef.current
        ) {
            props.onClickAway()
        }
    }
    //Effects
    // - Integrate ColourPicker API
    React.useEffect(() => {
        if (!ref.current) {
            return 
        }
        const colorPicker = new iro.ColorPicker(ref.current, {
            color: props.initialColour || null
        })
        //Events
        const onChange = (colour) => {
            if (props.onChange) {
                props.onChange(colour)
            }
        }
        //Attach event listeners
        colorPicker.on("color:change", onChange)
        return () => {
            //Remove event listeners
            colorPicker.off("color:change", onChange)
        }
    }, [])
    //Render
    return (
        <div 
            ref={containerRef}
            className={
                inheritClasses(
                    props,
                    "cc-colour-picker"
                )
            }
            onClick={(e) => onClick(e)}
        >
            <div 
                ref={ref}
                className="cc-colour-picker__main"
            />
        </div>
    )
}

const hideableColourPicker = hideable(_ColourPicker)

const ColourPicker = hideableColourPicker
export default ColourPicker