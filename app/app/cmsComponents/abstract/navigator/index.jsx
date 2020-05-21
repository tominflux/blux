import React from 'react'
import ThumbRow from './thumbRow'
import { splitIntoGroups, immutablePush, immutableInsert } from '../../../misc'
import { NAVIGATOR_THUMB_TYPE } from './thumbRow/thumbCol'
import './styles.css'

const path = require("path")


export default function Navigator(props) {
    //State 
    const [navigation, setNavigation] = React.useState("")
    const [fetching, setFetching] = React.useState(false)
    const [received, setReceived] = React.useState(false)
    const [mostRecentFetch, setMostRecentFetch] = React.useState(null)
    const [thumbPropsCollection, setThumbPropsCollection] = React.useState([])
    const [dragOver, setDragOver] = React.useState(false)
    const [selected, setSelected] = React.useState(null) //Thumb Name
    //Functions 
    const getRequestPath = () => path.join(props.apiPath, navigation)
    //Actions
    const navigate = (newNavigation) => {
        setNavigation(newNavigation)
        setReceived(false)
        setThumbPropsCollection([])
    }
    const notifyThumbDeletion = () => {
        setReceived(false)
        setThumbPropsCollection([])
    }
    const notifyThumbRename = () => {
        setReceived(false)
        setThumbPropsCollection([])
    }
    const selectThumb = (thumbProps) => {
        setSelected(thumbProps)
    }
    //Events
    const onDragEnter = () => {
        if (!props.canDrop)
            return
        setDragOver(true)
    }
    const onDragOver = (e) => {
        if (!props.canDrop)
            return
        e.preventDefault()
        setDragOver(true)
    }
    const onDragLeave = () => {
        if (!props.canDrop)
            return
        setDragOver(false)
    }
    const onDrop = (e) => {
        if (!props.canDrop)
            return    
        e.preventDefault()
        setDragOver(false)
        const getFiles = () => {
            if (e.dataTransfer.items) {
                const items = [...e.dataTransfer.items]
                const fileItems = items.filter(
                    (item) => (item.kind === "file")
                )
                const files = fileItems.map(
                    (fileItem) => (fileItem.getAsFile())
                )
                return files
            } else {
                const files = [...e.dataTransfer.files]
                return files
            }
        }
        const files = getFiles()
        props.onDrop(files, navigation)
        .then(() => {
            setReceived(false)
            setThumbPropsCollection([])
        })
    }
    const onFolderNavigate = (thumbProps) => {
        const newNavigation = path.join(navigation, thumbProps.name)
        navigate(newNavigation)
        if (props.onNavigate)
            props.onNavigate(newNavigation)
    }
    const onThumbSelect = (thumbProps) => {
        selectThumb(thumbProps)
        props.onSelect(thumbProps, navigation)
    }
    const onThumbRename = async (thumbProps, newName) => {
        const currentName = thumbProps.name
        if (currentName === newName) 
            return
        const response = await props.onRename(thumbProps, navigation, newName)
        if (!response.ok) {
            alert(
                `Could not rename.`
            )
        }
        notifyThumbRename()
    }
    const onThumbDelete = async (thumbProps) => {
        await props.onDelete(thumbProps, navigation)
        notifyThumbDeletion()
    }
    //Effects
    // - Fetch and Generate Thumbs
    React.useEffect(() => {
        //Functions
        const fetchApiResponse = async () => {
            const rawResponse = await fetch(getRequestPath())
            const parsedResponse = await rawResponse.json()
            return parsedResponse
        }
        const processIntoThumbProps = async (apiResponse) => (
            await props.processApiResponse(apiResponse)
        )
        const addUpDirThumb = (intermediateThumbProps) => (
            (
                navigation !== "/" && 
                navigation !== "" && 
                navigation !== "./"
            ) ?
                immutableInsert(
                    {
                        type: NAVIGATOR_THUMB_TYPE.FOLDER,
                        name: "../"
                    },
                    -1,
                    intermediateThumbProps
                ) : intermediateThumbProps
        )
        const fetchAndGenerateThumbs = async () => {
            setMostRecentFetch(Date.now())
            setFetching(true)
            const response = await fetchApiResponse()
            setFetching(false)
            setReceived(true)
            const processedThumbProps = await processIntoThumbProps(response)
            const thumbsPropsWithUpDir = addUpDirThumb(processedThumbProps)
            setThumbPropsCollection(thumbsPropsWithUpDir)
        }  
        //
        const fetchRequired = (
            (
                fetching === false && 
                received === false
            ) || (
                props.externalMostRecentFetch &&
                props.externalMostRecentFetch > mostRecentFetch
            )
        )
        if (fetchRequired) {
            fetchAndGenerateThumbs()
            setThumbPropsCollection([])
        }
    })
    //
    const className = 
        "blux-navigator" + (
            dragOver ? " blux-navigator__drag-over" : ""
        )
    const thumbPropsRows = splitIntoGroups(thumbPropsCollection, 3)
    const dropEvents = (
        props.canDrop ? {
            onDragEnter: () => onDragEnter(),
            onDragLeave: () => onDragLeave(),
            onDragOver: (e) => onDragOver(e),
            onDrop: (e) => onDrop(e)
        } : {}
    )
    return (
        <div 
            className={className}
            {...dropEvents}
        >
            {
                thumbPropsRows.map(
                    (thumbPropsRow, index) => (
                        <ThumbRow 
                            key={index}
                            rowIndex={index}
                            //
                            thumbPropsCollection={thumbPropsRow}
                            //Flags
                            canSelect={props.canSelect}
                            canRename={props.canRename}
                            canDelete={props.canDelete}
                            //Events
                            onFolderNavigate={(thumbProps) => onFolderNavigate(thumbProps)}
                            onThumbSelect={(thumbProps) => onThumbSelect(thumbProps)}
                            onThumbRename={(thumbProps, newName) => onThumbRename(thumbProps, newName)}
                            onThumbDelete={(thumbProps) => onThumbDelete(thumbProps)}
                            //
                            selected={selected}
                        />
                    )
                )
            }   
        </div>
    )
}