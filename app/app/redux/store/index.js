import { createStore } from "redux"
import BluxReducer from '../reducer'

const store = createStore(
    BluxReducer,
    (
        window.__REDUX_DEVTOOLS_EXTENSION__ && 
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store