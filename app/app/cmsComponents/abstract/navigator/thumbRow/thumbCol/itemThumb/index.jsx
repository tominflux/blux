import React from 'react'
import Thumb from '../../../../thumb'
import { NAVIGATOR_THUMB_TYPE } from '..'

export default function ItemThumb(props) {
    //Functions
    const getThumbProps = () => ({
        type: NAVIGATOR_THUMB_TYPE.ITEM,
        name: props.name,
        bgUrl: props.bgUrl,
        data: props.data || null
    })
    //Events
    const onClick = async () => {
        const thumbProps = getThumbProps()
        await props.onThumbSelect(thumbProps)
    }
    const onRename = async (newName) => {
        const thumbProps = getThumbProps()
        await props.onThumbRename(thumbProps, newName)
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
            canRename={props.canRename}
            showDelete={props.canDelete}
            //Events
            onClick={props.canSelect ? () => onClick() : null}
            onRename={props.canRename ? (newName) => onRename(newName) : null}
            onDelete={props.canDelete ? () => onDelete() : null}
        >
            {props.children}
        </Thumb>
    )
}
