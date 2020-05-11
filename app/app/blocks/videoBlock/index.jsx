import React from 'react'
import Plyr from 'plyr';
import NewVideo from './cmsComponents/newVideo'
import EditVideo from './cmsComponents/editVideo'
import MediaSelectorModal from '../../cmsComponents/modals/mediaSelectorModal'
const path = require("path")
import { MEDIA_VIDEO } from '../../misc';
import { blockify } from '../blockify';
import './styles.css'

function VideoBlock(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    //Ref
    const ref = React.useRef(null)
    //Effects
    // - Activate Plyr
    React.useEffect(() => {
        new Plyr(ref.current);
    }, [])
    //Events
    const onConfirm = (thumbProps, navigation) => {
        setShowSelector(false)
        const mediaId = path.join(
            navigation, thumbProps.name
        )
        const videoSrc = path.join(
            "/content/media", mediaId
        )
        props.updateVideoSrc(videoSrc)
    }
    //
    return (<>
        <div className="blux-video-block">
            {
                (props.src === null) ?
                    <NewVideo
                        show={props.showCms}
                        onClick={() => setShowSelector(true)}
                    /> :
                    <div className="blux-video-block__video-container">
                        <video 
                            className="blux-video-block__video"
                            ref={ref}
                            controls
                        >
                            <source 
                                src={props.src}
                            />
                            Your browser does not support the video tag.
                        </video>
                        <EditVideo
                            show={props.showCms}
                            onClick={() => setShowSelector(true)}
                        /> 
                    </div>
            }
        </div>
        <MediaSelectorModal
            show={showSelector}
            onClickAway={() => setShowSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirm(thumbProps, navigation)
            }
            mediaFilter={{
                types: [ MEDIA_VIDEO ]
            }}
            canDelete
            canDrop
        />
    </>)
}

export default blockify(VideoBlock)