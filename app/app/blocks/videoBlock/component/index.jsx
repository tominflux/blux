import React from 'react'
import VideoCmsOptions from './cmsComponents/cmsOptions'
import MediaSelectorModal from '../../../cmsComponents/modals/mediaSelectorModal'
import { VIDEO_SOURCE_TYPE } from '..';
import VideoBlockLocalVideo from './localVideo';
import VideoPlaceholder from './placeholder';
import { MEDIA_VIDEO } from '../../../misc';
import { blockify } from '../../blockify';
const path = require("path")
import './styles.css'

function VideoBlock(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
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
    //Getters
    const getVideo = () => {
        if (props.src === null) {
            return <VideoPlaceholder />
        }
        switch (props.srcType) {
            case VIDEO_SOURCE_TYPE.LOCAL:
                return (
                    <VideoBlockLocalVideo
                        src={props.src}
                    />
                )
            default:
                const msg = (
                    `Unrecognised video source type ` +
                    `[srcType=${props.srcType}].`
                )
                alert(msg)
                throw new Error(msg)
        }
    }
    //
    return (<>
        <div className="blux-video-block">
            { getVideo() }
            <VideoCmsOptions
                show={props.showCms}
                onSelectLocal={() => setShowSelector(true)}
            />
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