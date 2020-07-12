import React from 'react'
import BlogStreamComponent from './component'
import BLOG_STREAM_ACTIONS from './redux/actions'
import BLOG_STREAM_ACTION_TYPES from './redux/actionTypes'
import BlogStreamReducer, { blogStreamInitialState } from './redux/reducer'
import { FaStream } from 'react-icons/fa'

const BlogStreamBlock = {
    component: BlogStreamComponent,
    redux: {
        actions: BLOG_STREAM_ACTIONS,
        actionTypes: BLOG_STREAM_ACTION_TYPES,
        reducer: BlogStreamReducer,
        initialState: blogStreamInitialState
    },
    displayName: "Blog Stream",
    icon: () => <FaStream size={64}/>
}


export default BlogStreamBlock