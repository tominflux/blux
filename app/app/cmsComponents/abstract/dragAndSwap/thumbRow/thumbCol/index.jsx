import React from 'react'
import ItemThumb from './itemThumb'
import AddItemThumb from './addItemThumb'
import { THUMB_TYPES } from '../..'
import './styles.css'

export default function ThumbCol(props) {
    const {type, ...thumbPropsWithoutType} = props.thumbProps
    return (
        <div className="col-4 blux-drag-and-swap__thumb-col">
            {
                (type === THUMB_TYPES.ITEM) ? 
                    <ItemThumb 
                        blockId={props.blockId}
                        index={props.index}
                        //Internal events (linked to local state)
                        onThumbMoved={props.onThumbMoved}
                        onThumbAttemptedSwap={props.onThumbAttemptedSwap}
                        //
                        {...thumbPropsWithoutType}
                    /> :
                (type === THUMB_TYPES.ADD_ITEM) ? 
                    <AddItemThumb
                        onClick={props.onAddItem}
                    /> : 
                //
                    null
            }
        </div>
    )
}