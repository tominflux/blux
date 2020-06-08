import { combineReducers } from "redux";
import Auth from './auth'
import StaticRepo from'./staticRepo'
import PageCollection from './pageCollection'

export default combineReducers({
    Auth,
    StaticRepo,
    PageCollection,
})