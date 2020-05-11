import React from 'react'
import Thumb from '../../../../thumb'
import { NAVIGATOR_THUMB_TYPE } from '..'

export default function ItemThumb(props) {
    //Functions
    const getThumbProps = () => ({
        type: NAVIGATOR_THUMB_TYPE.ITEM,
        name: props.name,
        bgUrl: props.bgUrl
    })
    //Events
    const onClick = async () => {
        const thumbProps = getThumbProps()
        await props.onThumbSelect(thumbProps)
    }
    const onDelete = async () => {
        const thumbProps = getThumbProps()
        await props.onThumbDelete(thumbProps)
    }
    //
    return (
        <Thumb
            bgUrl={props.bgUrl}
            name={props.name}
            selected={props.selected}
            showDelete={props.canDelete}
            //Events
            onClick={props.canSelect ? () => onClick() : null}
            onDelete={props.canDelete ? () => onDelete() : null}
        >
            {props.children}
        </Thumb>
    )
}
