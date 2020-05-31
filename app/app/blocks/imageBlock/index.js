import ImageComponent from './component'
import IMAGE_ACTIONS from './redux/actions'
import IMAGE_ACTION_TYPES from './redux/actionTypes'
import ImageReducer, { newImageInitialState } from './redux/reducer'

const ImageBlock = {
    component: ImageComponent,
    redux: {
        actions: IMAGE_ACTIONS,
        actionTypes: IMAGE_ACTION_TYPES,
        reducer: ImageReducer,
        initialState: newImageInitialState
    }
}

export default ImageBlock