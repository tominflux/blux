import React from 'react'
import Thumb from '../../../../thumb'
import Octicon, { Plus } from '@primer/octicons-react'

export default function AddItemThumb(props) {
    return (
        <div className="blux-drag-and-swap__thumb-container">
            <Thumb
                onClick={props.onClick}
                name="Add Item"
            >
                <Octicon icon={Plus} size='large'/>
            </Thumb>
        </div>
    )
}