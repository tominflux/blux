import React from 'react'
import { getBlockMap } from '../blockMap'
import './styles.css'


/**
 * Block Renderer
 * Looks a block type in props and renders the 
 * corresponding block found in the block map.
 * Passes its props down to the actualised block.
 */
export default function Block(props) {
    const blockMap = getBlockMap()
    if (!blockMap.has(props.type)) {
        console.error(
            "Block type '" + props.type + "' does not exist."
        )
        return (
            <div className="blux-block">
                <p>Invalid Block</p>
            </div>
        )
    }
    const block = blockMap.get(props.type)
    const BlockComponent = block.component
    return <>
        <BlockComponent {...props} />
    </>
}
