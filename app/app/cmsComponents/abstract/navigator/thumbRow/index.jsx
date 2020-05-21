import React from 'react'
import ThumbCol from './thumbCol'
import './styles.css'

export default function ThumbRow(props) {
    const getThumbIndex = (indexInRow) => (
        props.rowIndex * 3 + indexInRow
    )
    return (
        <div className="row blux-navigator__thumb-row">
            {
                props.thumbPropsCollection.map(
                    (thumbProps, indexInRow) => (
                        <ThumbCol 
                            key={indexInRow}
                            //
                            index={getThumbIndex(indexInRow)}
                            thumbProps={thumbProps}
                            //Flags
                            canSelect={props.canSelect}
                            canRename={props.canRename}
                            canDelete={props.canDelete}
                            //Events
                            onFolderNavigate={props.onFolderNavigate}
                            onThumbSelect={props.onThumbSelect}
                            onThumbRename={props.onThumbRename}
                            onThumbDelete={props.onThumbDelete}
                            //
                            selected={props.selected}
                        />
                    )
                )
            }
        </div>
    )
}