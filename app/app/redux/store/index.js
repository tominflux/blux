import { createStore } from "redux"
import CompositeReducer from '../reducer'

const store = createStore(
    CompositeReducer,
    (
        window.__REDUX_DEVTOOLS_EXTENSION__ && 
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store