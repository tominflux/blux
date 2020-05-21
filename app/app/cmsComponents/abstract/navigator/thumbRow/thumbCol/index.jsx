import React from 'react'
import FolderThumb from './folderThumb'
import ItemThumb from './itemThumb'

export const NAVIGATOR_THUMB_TYPE = {
    FOLDER: "FOLDER",
    ITEM: "ITEM"
}

export default function ThumbCol(props) {
    const getThumb = () => {
        const {type, ...thumbProps} = props.thumbProps
        const mutualProps = {
            //Flags
            canRename: props.canRename,
            canDelete: props.canDelete,
            //Events
            onThumbRename: props.onThumbRename,
            onThumbDelete: props.onThumbDelete
        }
        const folderThumbProps = {
            //Events
            onFolderNavigate: props.onFolderNavigate,
        }
        const itemThumbProps = {
            //Flags
            canSelect: props.canSelect,
            //Events
            onThumbSelect: props.onThumbSelect,
            //
            selected: (
                props.selected &&
                thumbProps.name === props.selected.name
            )
        }
        switch (type) {
            case NAVIGATOR_THUMB_TYPE.FOLDER:
                return (
                    <FolderThumb 
                        {...thumbProps}
                        {...mutualProps}
                        {...folderThumbProps}
                    />
                )
            case NAVIGATOR_THUMB_TYPE.ITEM:
                return (
                    <ItemThumb 
                        {...thumbProps}
                        {...mutualProps}
                        {...itemThumbProps}
                    />
                )
            default:
                throw new Error(
                    "Invalid navigator thumb type: " +
                    type
                ) 
        }
    }
    return (
        <div className="col-4 blux-navigator__thumb-col">
            { getThumb() }
        </div>
    )
}