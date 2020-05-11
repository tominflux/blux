
const path = require("path")

export function getElementPosition(element, position={x: 0, y: 0}) {
    if (!element)
        return { ...position }
    const scrollX = (element.tagName === "BODY") ? 
        (element.scrollLeft || document.documentElement.scrollLeft) : 
        element.scrollLeft
    const scrollY = (element.tagName === "BODY") ? 
        (element.scrollLeft || document.documentElement.scrollLeft) : 
        element.scrollLeft
    const elementPosX = element.offsetLeft - scrollX + element.clientLeft
    const elementPosY = element.offsetTop - scrollY + element.clientTop
    const accumPosX = position.x + elementPosX
    const accumPosY = position.y + elementPosY
    const nextPos = getElementPosition(element.offsetParent, {
        x: accumPosX, y: accumPosY
    })
    return { ...nextPos }
}

export function immutableSwap(indexA, indexB, array) {
    const newArray = [...array]
    const cellA = array[indexA]
    const cellB = array[indexB]
    newArray[indexA] = cellB
    newArray[indexB] = cellA
    return newArray
}

export function immutableInsert(newCell, cellBeforeIndex, array) {
    const cellsBefore = array.slice(0, cellBeforeIndex + 1)
    const cellsAfter = array.slice(cellBeforeIndex + 1)
    return [
        ...cellsBefore,
        newCell,
        ...cellsAfter
    ]
}

export function immutableReplace(newCell, index, array) {
    const cellsBefore = array.slice(0, index)
    const cellsAfter = array.slice(index + 1)
    return [
        ...cellsBefore,
        newCell,
        ...cellsAfter
    ]
}

export function immutablePush(newCell, array) {
    return [
        ...array,
        newCell
    ]
}

export function immutableDelete(index, array) {
    const cellsBefore = array.slice(0, index)
    const cellsAfter = array.slice(index + 1)
    return [
        ...cellsBefore,
        ...cellsAfter
    ]
}

export function splitIntoGroups(array, groupSize) {
    const groups = []
    for (let i=0, limit=array.length; i<limit; i+=groupSize) {
        const start = i
        const end = (i + groupSize < limit) ? i + groupSize : limit
        const group = array.slice(start, end)
        groups.push(group)
    }
    return groups
}

export const getExtension = (mediaPath) => (
    path.basename(mediaPath).split('.').pop()
)

export const MEDIA_IMAGE   =   "MEDIA_IMAGE"
export const MEDIA_VIDEO   =   "MEDIA_VIDEO"
export const MEDIA_AUDIO   =   "MEDIA_AUDIO"
export const MEDIA_MISC    =   "MEDIA_MISC"

export const getMediaType = (extension) => {
    const lExt = extension.toLowerCase()
    if (
        lExt === "jpg"  ||
        lExt === "jpeg" ||
        lExt === "gif"  ||
        lExt === "png"  ||
        lExt === "webp" ||
        lExt === "bmp"  ||
        lExt === "tiff"
    ) {
        return MEDIA_IMAGE
    } else if (
        lExt === "mp4" ||
        lExt === "ogv" ||
        lExt === "webm"
    ) {
        return MEDIA_VIDEO
    } else if (
        lExt === "wav" ||
        lExt === "m4a" ||
        lExt === "mp3" ||
        lExt === "ogg" ||
        lExt === "flac"
    ) {
        return MEDIA_AUDIO
    } else {
        return MEDIA_MISC
    }
}

//Mouse Tracker
let mousePosition = null
let mouseMoveHandle = null
const startMouseTracking = () => {
    mouseMoveHandle = (e) => {
        mousePosition = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", mouseMoveHandle)
}
export const getMousePosition = () => {
    if (mouseMoveHandle === null)
        startMouseTracking()
    return { ...mousePosition }
}


//Animation Loop
const loopHandleMap = new Map()
export function startLoop(onLoop, onLoopKey=onLoop) {
    let loopHandle = { id: null }
    loopHandleMap.set(onLoopKey, loopHandle)
    //
    let timestamp = Date.now()
    const loopCall = () => {
        if (Date.now() - timestamp > 1000 / 60) {
            timestamp = Date.now()
            onLoop()
        }
        loopHandle.id = requestAnimationFrame(loopCall)
    }
    loopCall()
    return () => {
        if (loopHandle.id !== null) {
            cancelAnimationFrame(loopHandle.id)
        }
    }
}
export function endLoop(onLoop, onLoopKey=null) {
    const _key = onLoopKey || onLoop
    const loopHandle = loopHandleMap.get(_key)
    if (loopHandle.id !== null) {
        cancelAnimationFrame(loopHandle.id)
    }
    loopHandleMap.delete(onLoop)
}

//Run Type
let runType = null

export const RUN_TYPE = {
    CMS: "CMS",
    PUBLIC: "PUBLIC"
}

export const setRunType = (newRunType) => {
    if (runType !== null) {
        throw new Error(
            "Run-type already set. " +
            "(" + runType + ")" 
        )
    }
    if (
        newRunType !== RUN_TYPE.CMS &&
        newRunType !== RUN_TYPE.PUBLIC
    ) {
        throw new Error(
            "Invalid run-type. " + 
            "(" + newRunType + ")"
        )
    }
    runType = newRunType
}

export const getRunType = () => runType

export const isCMS = () => (getRunType() === RUN_TYPE.CMS)

//

export const inheritClasses = (props, newClass) => (
    (props.className ? props.className + " " : "") + newClass
)