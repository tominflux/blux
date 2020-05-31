import VideoComponent from './component'
import VIDEO_ACTIONS from './redux/actions'
import VIDEO_ACTION_TYPES from './redux/actionTypes'
import VideoReducer, { videoInitialState } from './redux/reducer'


const VideoBlock = {
    component: VideoComponent,
    redux: {
        actions: VIDEO_ACTIONS,
        actionTypes: VIDEO_ACTION_TYPES,
        reducer: VideoReducer,
        initialState: videoInitialState
    }
}

export default VideoBlock