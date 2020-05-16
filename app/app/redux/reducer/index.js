import { combineReducers } from "redux";
import Auth from './auth'
import StaticRepo from'./staticRepo'
import PageCollection from './pageCollection'
import MediaBrowser from './mediaBrowser'
import PageBrowser from './pageBrowser'

export default combineReducers({
    Auth,
    StaticRepo,
    PageCollection,
    MediaBrowser,
    PageBrowser,
})