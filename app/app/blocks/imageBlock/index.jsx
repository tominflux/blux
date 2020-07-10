import React from 'react'
import ImageComponent from './component'
import IMAGE_ACTIONS from './redux/actions'
import IMAGE_ACTION_TYPES from './redux/actionTypes'
import ImageReducer, { newImageInitialState } from './redux/reducer'
import Octicon, { FileMedia } from '@primer/octicons-react'

const ImageBlock = {
    component: ImageComponent,
    redux: {
        actions: IMAGE_ACTIONS,
        actionTypes: IMAGE_ACTION_TYPES,
        reducer: ImageReducer,
        initialState: newImageInitialState
    },
    displayName: "Image",
    icon: () => <Octicon icon={FileMedia} size='large'/>
}

export default ImageBlock