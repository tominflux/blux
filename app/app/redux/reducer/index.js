import { combineReducers } from "redux";
import Auth from './auth'
import StaticRepo from'./staticRepo'
import PageCollection from './pageCollection'

const cmsReducers = {
    Auth,
    StaticRepo
}

const publicReducers = {
    PageCollection
}

export default combineReducers({
    ...cmsReducers,
    ...publicReducers
})