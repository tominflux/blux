import { MEDIA_ROOT } from '../../index'
const path = require("path")

export const getImageThumbBgUrl = async (mediaPath) => (
    path.join(
        MEDIA_ROOT, mediaPath
    )
)

export const getVideoThumbBgUrl = async (mediaPath) => {
    const canvas = document.createElement("canvas")
    const video = document.createElement("video")
    video.src = path.join(
        MEDIA_ROOT, mediaPath
    )
    video.load()
    const onLoadMetadata = () => (
        new Promise(
            (resolve) => video.addEventListener(
                "loadedmetadata", () => resolve()
            )
        )
    )
    await onLoadMetadata()
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const onLoadVideo = () => (
        new Promise(
            (resolve) => video.addEventListener(
                "canplay", () => resolve()
            )
        )
    )
    await onLoadVideo()
    canvas.getContext('2d').drawImage(
        video, 
        0, 
        0, 
        video.videoWidth, 
        video.videoHeight
    )
    return canvas.toDataURL()
}