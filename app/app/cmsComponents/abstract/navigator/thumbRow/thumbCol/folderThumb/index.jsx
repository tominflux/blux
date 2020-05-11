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
    const onDelete = async () => {
        const thumbProps = getThumbProps()
        await props.onThumbDelete(thumbProps)
    }
    //
    return (
        <Thumb
            name={props.name}
            onClick={() => onClick()}
            showDelete={props.canDelete}
            onDelete={props.canDelete ? () => onDelete() : null}
        >
            <Octicon icon={FileDirectory} size='large'/>
        </Thumb>
    )
}