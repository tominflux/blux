import React from 'react'
import './styles.css'

export default function VideoBlockEmbedVideo(props) {
    //Render
    return (
        <div className="blux-video-block__embed-container">
            <iframe
                className="blux-video-block__embed-video"
                src={props.src}
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
