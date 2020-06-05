import React from 'react'
import { NAVIGATOR_THUMB_TYPE } from '../../../abstract/navigator/thumbRow/thumbCol'
import Octicon, { File } from '@primer/octicons-react'

const getThumbType = (isFolder) => {
    switch (isFolder) {
        case true:
            return NAVIGATOR_THUMB_TYPE.FOLDER
        case false:
            return NAVIGATOR_THUMB_TYPE.ITEM
        default:
            throw new Error(
                `'isFolder' neither true or false: ${isFolder}`
            )
    }
}

export const getThumbChildren = (isFolder) => {
    const type = getThumbType(isFolder)
    switch (type) {
        case NAVIGATOR_THUMB_TYPE.FOLDER:
            return null
        case NAVIGATOR_THUMB_TYPE.ITEM:
            return (
                <Octicon
                    icon={File}
                    size='large'
                />
            )
        default:
            throw new Error(
                `Invalid navigator-thumb type: ${type}"`
            )
    }
}

export const generateThumbProps = async (apiResponseItem) => {
    const { isFolder, name, path } = apiResponseItem
    return {
        type: getThumbType(isFolder),
        children: getThumbChildren(isFolder, name),
        name: name
    }
}

export const generateThumbPropsCollection = async (apiResponse, onlyFolders=false) => {
    const thumbPropsCollection = []
    for (const apiResponseItem of apiResponse.contents) {
        const thumbProps = 
            await generateThumbProps(apiResponseItem)
        thumbPropsCollection.push(thumbProps)
    }
    if (onlyFolders) {
        const filteredThumbPropsCollection = thumbPropsCollection.filter(
            thumbProps => thumbProps.isFolder === true
        )
        return filteredThumbPropsCollection
    } else {
        return thumbPropsCollection
    }
}