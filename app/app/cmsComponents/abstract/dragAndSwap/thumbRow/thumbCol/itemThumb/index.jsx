import React from 'react'
import { startLoop, getMousePosition, getElementPosition, endLoop } from "../../../../../../misc"
import Thumb from "../../../../thumb"


export default function ItemThumb(props) {
    const [isHeld, setHeld] = React.useState(false)
    const [heldPosition, setHeldPosition] = React.useState(null)
    const [mousePosition, setMousePosition] = React.useState(null)
    const ref = React.useRef(null)
    //Functions 
    const getLoopKey = (semanticName) => (
        "blux-drag-and-swap" + "__" +
        props.blockId + "__" + 
        "item-thumb" + "__" +
        semanticName
    )
    //Effects
    // - Thumb Drag Observer
    React.useEffect(() => {
        //
        const loopKey = getLoopKey("thumb-drag-observer")
        //Events Triggered from Effect
        const onPositionUpdate = () => {
            //Inform parent Drag-and-Swap component of absolute
            //thumb position
            const absolutePosition = getElementPosition(ref.current)
            props.onThumbMoved(
                props.index, 
                absolutePosition
            )
        }
        const onLoop = () => {
            //Update Recorded Mouse Position
            const newMousePos = getMousePosition()
            setMousePosition(newMousePos)
            //
            onPositionUpdate()
        }
        //UI Events
        const onMouseDown = (e) => {
            //Update state to say a thumb is being held.
            setHeld(true)
            //Update state to record position at which thumb was held.
            setHeldPosition({
                x: e.clientX,
                y: e.clientY
            })
            //Start loop to observe mouse movements.
            startLoop(onLoop, loopKey)
        }
        const onMouseUp = () => {
            //If thumb is not held, do nothing.
            if (!isHeld) return 
            //Update state to say a thumb is no longer being held.
            setHeld(false)
            //End loop observing mouse movements
            endLoop(onLoop, loopKey)
            //Get absolute position of thumb.
            const absolutePosition = getElementPosition(ref.current)
            //Report an attempt of swapping this thumb with another 
            //thumb to the parent Drag-and-Swap component, 
            //with thumb's absolute position.
            props.onThumbAttemptedSwap(
                props.index,
                absolutePosition
            )
        }
        //Construct
        onPositionUpdate()
        window.addEventListener("mouseup", onMouseUp)
        ref.current.addEventListener("mousedown", onMouseDown)
        //Deconstruct
        return () => {
            window.removeEventListener("mouseup", onMouseUp)
            ref.current.removeEventListener("mousedown", onMouseDown)
        }
    })
    //Functions
    const getRelativePositioning = () => {
        const positionsRecorded = (
            isHeld &&
            mousePosition && heldPosition &&
            mousePosition.x && heldPosition.x &&
            mousePosition.y && heldPosition.y
        ) 
        if (!positionsRecorded) return null
        return {
            x: mousePosition.x - heldPosition.x,
            y: mousePosition.y - heldPosition.y
        }
    }
    //Property preparation.
    // - style
    const relativePositioning = getRelativePositioning()
    const relativePositioningStyle = relativePositioning ? {
        position: "relative",
        left: relativePositioning.x,
        top: relativePositioning.y,
        zIndex: 1333
    } : {}
    const style = { ...relativePositioningStyle }
    // - class
    const shrinkClass = props.shrink ?
        " blux-drag-and-swap__thumb-container--shrink" : ""
    const className = 
        "blux-drag-and-swap__thumb-container" + 
        shrinkClass
    // - misc
    const name = "#" + props.index + " - " + props.name
    //
    return (
        <div
            className={className}
            style={style}
            ref={ref}
        >
            <Thumb
                name={name}
                bgUrl={props.bgUrl}
                showDelete={props.onDelete}
                onDelete={props.onDelete}
                showConfigure={props.onConfigure}
                onConfigure={props.onConfigure}
            />
        </div>
    )
}