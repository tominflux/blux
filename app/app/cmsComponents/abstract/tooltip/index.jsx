import React from 'react'
import { cmsify, hideable } from '../../cmsify'
import { inheritClasses, quickObjectCompare } from '../../../misc'
import './styles.css'


const StaticTooltip = (props) => (
    <div 
        className={inheritClasses(props, "blux-tooltip")}
        style={{
            left: props.position.x + "px",
            top: props.position.y + "px"
        }}
    >
        <span className="blux-tooltip__content">
            {props.children}
        </span>
    </div>
)

const HideableStaticTooltip = hideable(StaticTooltip)

const bringToLife = (hideableStaticTooltip) => {
    const InnerComponent = hideableStaticTooltip
    return (props) => {
        //State
        const [show, setShow] = React.useState(false)
        const [position, setPosition] = React.useState({x: 0, y: 0})
        //Effects
        React.useEffect(() => {
            if (props.targetRef.current === null)
                return
        }, [])
        // - Update Position
        React.useEffect(() => {
            if (props.targetRef.current === null)
                return
            //
            const element = props.targetRef.current
            //Add event listeners
            const onMouseEnter = () => setShow(true)
            const onClick = () => setShow(false)
            const onMouseLeave = () => setShow(false)
            element.addEventListener("mouseenter", onMouseEnter)
            element.addEventListener("click", onClick)
            element.addEventListener("mouseleave", onMouseLeave)
            //Get Position
            const newPosition = {
                x: element.offsetLeft + element.clientWidth / 2,
                y: element.offsetTop + element.clientHeight
            }
            //Apply Position (if changed)
            const positionChanged = (
                !quickObjectCompare(position, newPosition)
            )
            if (positionChanged)
                setPosition(newPosition)
            //Remove Event Listeners
            return () => {
                if (props.targetRef.current === null)
                    return
                const element = props.targetRef.current
                element.removeEventListener("mouseenter", onMouseEnter)
                element.removeEventListener("click", onClick)
                element.removeEventListener("mouseleave", onMouseLeave)
            }
        })
        //Render
        return (
            <InnerComponent 
                show={show}
                position={position}
            >
                {props.children}
            </InnerComponent>
        )
    }
}

const ActiveTooltip = bringToLife(HideableStaticTooltip)

export default ActiveTooltip