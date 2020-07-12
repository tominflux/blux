import React from 'react'


export default function VideoBlockLocalVideo(props) {
    //Ref
    return (
        <div className="blux-video-block__local-container">
            <video
                className="blux-video-block__local-video"
                ref={ref}
            >
                
            </video>
        </div>
    )
}