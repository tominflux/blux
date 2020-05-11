import { combineReducers } from "redux";
import PageCollection from './pageCollection'
import MediaBrowser from './mediaBrowser'
import PageBrowser from './pageBrowser'
import Git from'./git'

export default combineReducers({
    PageCollection,
    MediaBrowser,
    PageBrowser,
    Git
})