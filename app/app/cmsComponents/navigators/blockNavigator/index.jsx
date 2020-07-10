import React from 'react'
import Navigator from '../../abstract/navigator'
import { getBlockMap } from '../../../blockMap'
import { NAVIGATOR_THUMB_TYPE } from '../../abstract/navigator/thumbRow/thumbCol'


export default function BlockNavigator(props) {
    //Events
    const onSelect = async (thumbProps) => {
        if (props.onSelect)
            props.onSelect(thumbProps)
    }
    //Functions
    const fetchThumbs = () => {
        //Get block map (including custom)
        const blockMap = getBlockMap()
        const blockKeys = blockMap.keys()
        //Map to thumbProps collection.
        const blockToThumbProps = (blockKey) => {
            const block = blockMap.get(blockKey)
            return {
                type: NAVIGATOR_THUMB_TYPE.ITEM,
                children: block.icon || null,
                name: block.displayName || blockKey
            }
        }
        const thumbPropsCollection = blockKeys.map(
            (blockKey) => blockToThumbProps(blockKey)
        )
        //
        return thumbPropsCollection
    }
    //Render
    return (
        <Navigator
            fetchThumbs={
                async () => await fetchThumbs()
            }
            onNavigate={null}
            onSelect={
                async (thumbProps) => 
                    await onSelect(thumbProps)
            }
            onRename={null}
            onDelete={null}
            canSelect={true}
            canDelete={false}
            canRename={false}
            canDrop={false}
            externalMostRecentFetch={null}
        />
    )
}