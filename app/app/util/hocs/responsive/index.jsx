import React from 'react'
import { getViewportSize, VIEWPORT_SIZE } from '../../viewportSize'
import { startLoop, endLoop } from '../../../misc'

let loopKeyIndex = -1
const newLoopKey = () => {
    loopKeyIndex ++
    return `responsive-observer-${loopKeyIndex}`
}

const responsive = (component) => {
    const InnerComponent = component
    //
    const responsiveComponent = (props) => {
        //State
        const [viewportSize, setViewportSize] = React.useState(
            VIEWPORT_SIZE.XL
        )
        //Effects
        // - Observe Viewport Size
        React.useEffect(() => {
            const loopKey = newLoopKey()
            //
            const onLoop = () => {
                const newViewportSize = getViewportSize()
                if (newViewportSize !== viewportSize) {
                    setViewportSize(newViewportSize)
                }
            }
            //
            startLoop(onLoop, loopKey)
            //
            return () => {
                endLoop(onLoop, loopKey)
            }
        })
        //Render
        return (
            <InnerComponent
                viewportSize={viewportSize}
                {...props}
            />
        )
    }
    //
    return responsiveComponent
}

export default responsive