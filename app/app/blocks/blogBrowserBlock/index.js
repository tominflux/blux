import BlogBrowserComponent from './component'
import BLOG_BROWSER_ACTIONS from './redux/actions'
import BLOG_BROWSER_ACTION_TYPES from './redux/actionTypes'
import BlogBrowserReducer, { blogBrowserInitialState } from './redux/reducer'

const BlogBrowserBlock = {
    component: BlogBrowserComponent,
    redux: {
        actions: BLOG_BROWSER_ACTIONS,
        actionTypes: BLOG_BROWSER_ACTION_TYPES,
        reducer: BlogBrowserReducer,
        initialState: blogBrowserInitialState
    }
}


export default BlogBrowserBlock