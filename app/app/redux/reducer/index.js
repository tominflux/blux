import { combineReducers } from "redux";
import Auth from './auth'
import PageCollection from './pageCollection'
import BluxApp from '../../../../../blux-app'

const cmsReducers = {
    Auth
}

const publicReducers = {
    PageCollection
}

const customReducers = {
    ...BluxApp.redux.reducers
}

const compositeReducer = combineReducers({
    ...cmsReducers,
    ...publicReducers,
    ...customReducers
})

export default compositeReducer