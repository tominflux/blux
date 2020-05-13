import { combineReducers } from "redux";
import StaticRepo from'./staticRepo'
import PageCollection from './pageCollection'
import MediaBrowser from './mediaBrowser'
import PageBrowser from './pageBrowser'

export default combineReducers({
    StaticRepo,
    PageCollection,
    MediaBrowser,
    PageBrowser,
})