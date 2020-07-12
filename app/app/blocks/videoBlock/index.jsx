import React from 'react'
import VideoComponent from './component'
import VIDEO_ACTIONS from './redux/actions'
import VIDEO_ACTION_TYPES from './redux/actionTypes'
import VideoReducer, { videoInitialState } from './redux/reducer'
import Octicon, { Play } from '@primer/octicons-react'

export const VIDEO_SOURCE_TYPE = {
    LOCAL: "LOCAL",
    EMBED: "EMBED"
}

const VideoBlock = {
    component: VideoComponent,
    redux: {
        actions: VIDEO_ACTIONS,
        actionTypes: VIDEO_ACTION_TYPES,
        reducer: VideoReducer,
        initialState: videoInitialState
    },
    displayName: "Video",
    icon: () => <Octicon icon={Play} size="large"/>
}

export default VideoBlock