import React from 'react'
import Navigator from '../../abstract/navigator'
import { generateThumbPropsCollection } from './processApiResponse'
import { filterThumbPropsCollection } from './processApiResponse'
import { NAVIGATOR_THUMB_TYPE } from '../../abstract/navigator/thumbRow/thumbCol'
const path = require("path")

export const API_ROOT = "/api/page-browser/"

export default function PageNavigator(props) {
    //Events
    const onNavigate = async (navigation) => {
        if (props.onNavigate)
            props.onNavigate(navigation)
    }
    const onSelect = async (thumbProps, navigation) => {
        if (props.onSelect)
            props.onSelect(thumbProps, navigation)
    }
    const onRename = async (thumbProps, navigation, newName) => {
        const apiPath = path.join(
            API_ROOT, navigation, thumbProps.name
        )
        const newPagePath = path.join(
            navigation, newName
        )
        const requestBody = { newPath: newPagePath }
        const response = await fetch(
            apiPath,
            { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
                body: JSON.stringify(requestBody)
            }
        )
        return response
    }
    const onDelete = async (thumbProps, navigation) => {
        const deletePath = path.join(
            API_ROOT, navigation, thumbProps.name
        )
        const requestBody = {
            isFolder: (thumbProps.type === NAVIGATOR_THUMB_TYPE.FOLDER)
        }
        await fetch(
            deletePath,
            { 
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
                body: JSON.stringify(requestBody)
            }
        )
    }
    //
    const processApiResponse = async (response) => {
        const thumbPropsCollection = 
            await generateThumbPropsCollection(response, props.onlyFolders)
        const filteredThumbPropsCollection = 
            filterThumbPropsCollection(thumbPropsCollection, props.pageFilter)
        return filteredThumbPropsCollection
    }
    //
    return (
        <Navigator
            apiPath={API_ROOT}
            processApiResponse={
                async (response) => 
                    await processApiResponse(response)
            }
            onNavigate={
                async (navigation) =>
                    await onNavigate(navigation)
            }
            onSelect={
                async (thumbProps, navigation) => 
                    await onSelect(thumbProps, navigation)
            }
            onRename={
                async (thumbProps, navigation, newName) =>
                    await onRename(thumbProps, navigation, newName)
            }
            onDelete={
                async (thumbProps, navigation) =>
                    await onDelete(thumbProps, navigation)
            }
            canSelect={props.canSelect}
            canDelete={props.canDelete}
            canRename={props.canRename}
            canDrop={false}
            externalMostRecentFetch={props.externalMostRecentFetch}
        />
    )
}