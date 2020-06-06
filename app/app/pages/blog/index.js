import BlogPageComponent from './component'
import BLOG_PAGE_ACTIONS from './redux/actions'
import BLOG_PAGE_ACTION_TYPES from './redux/actionTypes'
import BlogPageReducer, { blogPageInitialState } from './redux/reducer'

const BlogPage = {
    component: BlogPageComponent,
    redux: {
        actions: BLOG_PAGE_ACTIONS,
        actionTypes: BLOG_PAGE_ACTION_TYPES,
        reducer: BlogPageReducer,
        initialState: blogPageInitialState
    }
}

export default BlogPage