import BlogStreamComponent from './component'
import BLOG_STREAM_ACTIONS from './redux/actions'
import BLOG_STREAM_ACTION_TYPES from './redux/actionTypes'
import BlogStreamReducer, { blogStreamInitialState } from './redux/reducer'

const BlogStreamBlock = {
    component: BlogStreamComponent,
    redux: {
        actions: BLOG_STREAM_ACTIONS,
        actionTypes: BLOG_STREAM_ACTION_TYPES,
        reducer: BlogStreamReducer,
        initialState: blogStreamInitialState
    }
}


export default BlogStreamBlock