import React from 'react'
import { getExtension, getMediaType, MEDIA_IMAGE, MEDIA_VIDEO } from "../../../../misc"
import { getImageThumbBgUrl, getVideoThumbBgUrl } from "./thumbBgUrl"
import { NAVIGATOR_THUMB_TYPE } from "../../../abstract/navigator/thumbRow/thumbCol"
import Octicon, { Play } from '@primer/octicons-react'

export const getThumbType = (isFolder) => {
    switch (isFolder) {
        case true:
            return NAVIGATOR_THUMB_TYPE.FOLDER
        case false:
            return NAVIGATOR_THUMB_TYPE.ITEM
        default:
            throw new Error(
                "'isFolder' neither true or false"
            )
    }
}

export const getThumbMediaType = (thumbName) => {
    const extension = getExtension(thumbName)
    const mediaType = getMediaType(extension)
    return mediaType
}

export const getThumbBgUrl = async (isFolder, thumbName, mediaPath) => {
    if (getThumbType(isFolder) !== NAVIGATOR_THUMB_TYPE.ITEM) 
        return null
    const mediaType = getThumbMediaType(thumbName)
    switch (mediaType) {
        case MEDIA_IMAGE:
            return getImageThumbBgUrl(mediaPath)
        case MEDIA_VIDEO:
            return getVideoThumbBgUrl(mediaPath)
        default: 
            return null
    }
}

export const getThumbChildren = (isFolder, thumbName) => {
    const isItem = (getThumbType(isFolder) === NAVIGATOR_THUMB_TYPE.ITEM) 
    if (!isItem)
        return null
    switch (getThumbMediaType(thumbName)) {
        case MEDIA_VIDEO:
            return (
                <Octicon 
                    className="blux-media-navigator__video-icon"
                    icon={Play} 
                    size='large'
                />
            )
        default: 
            return null
    }
}

export const generateThumbProps = async (apiResponseItem) => {
    const { isFolder, name, path } = apiResponseItem
    return {
        type: getThumbType(isFolder),
        bgUrl: await getThumbBgUrl(isFolder, name, path),
        children: getThumbChildren(isFolder, name),
        name: name
    }
}

export const checkMediaTypeFilter = (thumbProps, types) => {
    const mediaType = getThumbMediaType(thumbProps.name)
    return (
        types &&
        types.indexOf(mediaType) !== -1
    )
}

export const filterThumbProps = (thumbProps, thumbFilter) => (
    thumbProps.type === NAVIGATOR_THUMB_TYPE.FOLDER || (
        checkMediaTypeFilter(thumbProps, thumbFilter.types)
    )
)

export const generateThumbPropsCollection = async (apiResponse) => {
    const thumbPropsCollection = []
    for (const apiResponseItem of apiResponse.contents) {
        const thumbProps = 
            await generateThumbProps(apiResponseItem)
        thumbPropsCollection.push(thumbProps)
    }
    return thumbPropsCollection
}

export const filterThumbPropsCollection = (thumbPropsCollection, thumbFilter) => {
    if (!thumbFilter)
        return thumbPropsCollection
    const filteredThumbPropsCollection = 
        thumbPropsCollection.filter(
            thumbProps => filterThumbProps(thumbProps, thumbFilter)
        )
    return filteredThumbPropsCollection
}