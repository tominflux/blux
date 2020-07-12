import React from 'react'
import VideoCmsOptions from './cmsComponents/cmsOptions'
import MediaSelectorModal from '../../../cmsComponents/modals/mediaSelectorModal'
import { VIDEO_SOURCE_TYPE } from '..';
import VideoBlockLocalVideo from './localVideo';
import VideoBlockEmbedVideo from './embedVideo' 
import VideoPlaceholder from './placeholder';
import { MEDIA_VIDEO } from '../../../misc';
import { blockify } from '../../blockify';
const path = require("path")
import './styles.css'
import UrlPromptModal from '../../../cmsComponents/modals/urlPromptModal';

function VideoBlock(props) {
    //State
    const [showMediaSelector, setShowMediaSelector] = React.useState(false)
    const [showUrlPrompt, setShowUrlPrompt] = React.useState(false)
    //Events
    const onConfirmMedia = (thumbProps, navigation) => {
        setShowMediaSelector(false)
        const mediaId = path.join(
            navigation, thumbProps.name
        )
        const videoSrc = path.join(
            "/content/media", mediaId
        )
        props.setLocalSrc(videoSrc)
    }
    const onConfirmUrl = (url) => {
        props.setEmbedSrc(url)
        setShowUrlPrompt(false)
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
            case VIDEO_SOURCE_TYPE.EMBED:
                return (
                    <VideoBlockEmbedVideo
                        src={props.src}
                    />
                )
            default:
                const msg = (
                    `Unrecognised video source type ` +
                    `[srcType=${props.srcType}].`
                )
                alert(msg)
                console.error(msg)
                return <VideoPlaceholder />
        }
    }
    //
    return (<>
        <div className="blux-video-block">
            { getVideo() }
            <VideoCmsOptions
                show={props.showCms}
                onSelectLocal={() => setShowMediaSelector(true)}
                onEmbedIframe={() => setShowUrlPrompt(true)}
            />
        </div>
        <MediaSelectorModal
            show={showMediaSelector}
            onClickAway={() => setShowMediaSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirmMedia(thumbProps, navigation)
            }
            mediaFilter={{
                types: [ MEDIA_VIDEO ]
            }}
            canDelete
            canDrop
        />
        <UrlPromptModal
            show={showUrlPrompt}
            onClickAway={() => setShowUrlPrompt(false)}
            onConfirm={(url) => onConfirmUrl(url)}
        />
    </>)
}

export default blockify(VideoBlock)