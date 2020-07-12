import React from 'react'
import './styles.css'


export default function VideoBlockLocalVideo(props) {
    //Ref
    const ref = React.useRef(null)
    //Effects
    // - Activate Plyr
    React.useEffect(() => {
        new Plyr(ref.current);
    }, [])
    //Render
    return (
        <div className="blux-video-block__local-container">
            <video
                className="blux-video-block__local-video"
                ref={ref}
                controls
            >
                <source
                    src={props.src}
                />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}