import React from 'react'
import Navigator from '../../abstract/navigator'
import { generateThumbPropsCollection, filterThumbPropsCollection } from './processApiResponse'
const path = require("path")
import './styles.css'

export const API_ROOT = "/api/media/"
export const MEDIA_ROOT = "/content/media/"

export default function MediaNavigator(props) {
    //Function
    const uploadFile = async (file, navigation) => {
        const formData = new FormData()
        formData.append("media", file)
        const uploadPath = path.join(
            API_ROOT, navigation, file.name
        )
        const response = await fetch(
            uploadPath, 
            {
                method: "POST",
                credentials: "same-origin",
                body: formData
            }
        )
        if (!response.ok) {
            alert("Could not upload file.")
        }
    }
    //Events
    const onDrop = async (files, navigation) => {
        if (!props.canDrop)
            return
        for (const file of files) 
            uploadFile(file, navigation)
    }
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
        const newMediaPath = path.join(
            navigation, newName
        )
        const requestBody = { newPath: newMediaPath }
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
        await fetch(
            deletePath,
            { method: "DELETE", credentials: "same-origin" }
        )
    }
    //Functions
    const fetchThumbs = async (navigation) => {
        const requestPath = path.join(API_ROOT, navigation)
        const response = await fetch(
            requestPath, 
            { credentials: "same-origin" }
        )
        if (!response.ok) {
            const msg = "Could not fetch MediaNavigator thumbs."
            alert(msg)
            throw new Error(msg)
        }
        try {
            const thumbsData = await response.json()
            const thumbPropsCollection = 
                await generateThumbPropsCollection(
                    thumbsData, props.onlyFolders
                )
            const filteredThumbPropsCollection = 
                filterThumbPropsCollection(
                    thumbPropsCollection, props.mediaFilter
                )
            return filteredThumbPropsCollection
        } catch (err) {
            console.error(err)
            alert("Could not parse MediaNavigator thumbs.")
            throw err
        }
    }
    //
    return (
        <Navigator
            fetchThumbs={
                async (navigation) => 
                    await fetchThumbs(navigation)
            }
            onDrop={
                async (files, navigation) => 
                    await onDrop(files, navigation)
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
            canDrop={props.canDrop}
            externalMostRecentFetch={props.externalMostRecentFetch}
        />
    )
}