import React from 'react'
import ThumbRow from './thumbRow'
import { splitIntoGroups, immutableReplace, immutablePush } from '../../../misc'
import './styles.css'

export const THUMB_TYPES = {
    ITEM: "ITEM",
    ADD_ITEM: "ADD_ITEM"
}

export const createThumbProps = (
    name,
    bgUrl, 
    onDelete,
    children
) => ({
    name, bgUrl, onDelete, children
})

//Props:
// - blockId
// - thumbs : Array<ThumbProps> (use createThumbProps for guidance)
// - onAddItem *
// - onSwapItems *
// - onDeleteItem *
// *(redux / higher level state)
export default function DragAndSwap(props) {
    const [thumbPositions, setThumbPositions] =
        React.useState(
            props.thumbs.map(() => ({ x: null, y: null }))
        )
    const [thumbsShrink, setThumbsShrink] =
        React.useState(
            props.thumbs.map(() => false)
        )
    //Functions
    /**
     * @returns False if not close. Index of other thumb if close.
     */
    const isCloseToOtherThumb = (index, absolutePosition) => {
        const checkThumbProximity = (pos1, pos2) => (
            Math.abs(pos2.x - pos1.x) < 133 &&
            Math.abs(pos2.y - pos1.y) < 133
        )
        const otherPositions = [...thumbPositions]
        for (const otherPosition of otherPositions) {
            const otherIndex = otherPositions.indexOf(otherPosition)
            if (
                index !== otherIndex &&
                otherPosition &&
                otherPosition.x &&
                otherPosition.y
            ) {
                const closeEnough = checkThumbProximity(
                    absolutePosition, otherPosition
                )
                if (closeEnough) {
                    return otherIndex
                }
            }
        }
        return false
    }
    //Events
    const onThumbMoved = (index, absolutePosition) => {
        const isNewThumb = (index === thumbPositions.length)
        const recordedPosition = (isNewThumb ?
            null : thumbPositions[index]
        )
        const positionChanged = (
            isNewThumb || (
                recordedPosition.x !== absolutePosition.x ||
                recordedPosition.y !== absolutePosition.y
            )
        )
        if (positionChanged) {
            setThumbPositions(
                isNewThumb ?
                    immutablePush(
                        absolutePosition, thumbPositions
                    ) :
                    immutableReplace(
                        absolutePosition, index, thumbPositions
                    )
            )
            const closeIndex = isCloseToOtherThumb(index, absolutePosition)
            if (closeIndex !== false) {
                const alreadyShrunk = thumbsShrink[closeIndex]
                if (!alreadyShrunk) {
                    //Shrink close thumb.
                    setThumbsShrink(
                        immutableReplace(
                            true, closeIndex, thumbsShrink
                        )
                    )
                }
            } else {
                //Unshrink all
                setThumbsShrink(
                    props.thumbs.map(() => false)
                )
            }
        }
    }
    const onThumbAttemptedSwap = (index) => {
        const absolutePosition = thumbPositions[index]
        const closeIndex = isCloseToOtherThumb(index, absolutePosition)
        if (closeIndex !== false) {
            //Swap close thumb
            props.onSwapItems(index, closeIndex)
        }
    }
    //
    const thumbsWithTypeProp = props.thumbs.map(
        (thumb) => ({
            ...thumb,
            type: THUMB_TYPES.ITEM
        })
    )
    const thumbsWithShrinkProp = thumbsWithTypeProp.map(
        (thumb, index) => ({
            ...thumb,
            shrink: thumbsShrink[index]
        })
    )
    const addItemThumb = {
        type: THUMB_TYPES.ADD_ITEM
    }
    const thumbsWithAddItem = [
        ...thumbsWithShrinkProp,
        addItemThumb
    ]
    const thumbRows = splitIntoGroups(
        thumbsWithAddItem, 3
    )
    //
    return (
        <div className="blux-drag-and-swap">
            {
                thumbRows.map(
                    (thumbRow, index) => (
                        <ThumbRow
                            key={index}
                            //
                            blockId={props.blockId}
                            rowIndex={index}
                            thumbs={thumbRow}
                            //Parent events (linked to redux)
                            onAddItem={props.onAddItem}
                            //Internal events (linked to local state)
                            onThumbMoved={onThumbMoved}
                            onThumbAttemptedSwap={onThumbAttemptedSwap}
                        />
                    )
                )
            }
        </div>
    )
}