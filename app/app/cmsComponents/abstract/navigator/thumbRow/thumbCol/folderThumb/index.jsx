import React from 'react'
import Thumb from '../../../../thumb'
import Octicon, { FileDirectory } from '@primer/octicons-react'
import { NAVIGATOR_THUMB_TYPE } from '..'

export default function FolderThumb(props) {
    //Functions
    const getThumbProps = () => ({
        type: NAVIGATOR_THUMB_TYPE.FOLDER,
        name: props.name
    })
    //Events
    const onClick = async () => {
        const thumbProps = getThumbProps()
        await props.onFolderNavigate(thumbProps)
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
            name={props.name}
            onClick={() => onClick()}
            canRename={props.canRename}
            showDelete={props.canDelete}
            onRename={props.canRename ? (newName) => onRename(newName) : null}
            onDelete={props.canDelete ? () => onDelete() : null}
        >
            <Octicon icon={FileDirectory} size='large'/>
        </Thumb>
    )
}