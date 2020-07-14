import React from 'react'
import { extractEmbed } from '../../../../misc/embed'
import { MEDIA_VIDEO } from '../../../../misc'
import './styles.css'

export default function VideoBlockEmbedVideo(props) {
    //Getters
    const getIframeSrc = () => {
        const embedExtraction = extractEmbed(props.src)
        if (embedExtraction === null) {
            const msg = (
                `Could not find media to embed from source. ` +
                `[src=${props.src}]`
            )
            console.error(msg)
            alert(msg)
        } else if (embedExtraction.type !== MEDIA_VIDEO) {
            const msg = (
                `Media from source provided is not a video.` +
                `[mediaType=${embedExtraction.type}]`
            )
            console.error(msg)
            alert(msg)
        } else {
            return embedExtraction.src
        }
        //For the future:
        //Create iFrame that shows "invalid" message.
        return ""
    }
    //Render
    return (
        <div className="blux-video-block__embed-container">
            <iframe
                className="blux-video-block__embed-video"
                src={getIframeSrc()}
                frameBorder="0"
                allow={
                    "accelerometer; autoplay; encrypted-media; gyroscope; " +
                    "picture-in-picture"
                }
                allowFullScreen
            />
        </div>
    )
}
