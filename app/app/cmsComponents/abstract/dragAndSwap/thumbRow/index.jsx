import React from 'react'
import ThumbCol from './thumbCol'
import './styles.css'

export default function ThumbRow(props) {
    const getThumbIndex = (indexInRow) => (
        props.rowIndex * 3 + indexInRow
    )
    return (
        <div className="row blux-drag-and-swap__thumb-row">
            {
                props.thumbs.map(
                    (thumbProps, indexInRow) => (
                        <ThumbCol
                            key={indexInRow}
                            //
                            blockId={props.blockId}
                            index={getThumbIndex(indexInRow)}
                            //Parent events (linked to redux)
                            onAddItem={props.onAddItem}
                            //Internal events (linked to local state)
                            onThumbMoved={props.onThumbMoved}
                            onThumbAttemptedSwap={props.onThumbAttemptedSwap}
                            //
                            thumbProps={thumbProps}
                        />
                    )
                )
            }
        </div>
    )
}