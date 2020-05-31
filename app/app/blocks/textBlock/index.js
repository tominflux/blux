import TextComponent from './component'
import TEXT_ACTIONS from './redux/actions'
import TEXT_ACTION_TYPES from './redux/actionTypes'
import TextReducer, { newTextInitialState } from './redux/reducer'
import textPersistifier from './persistifier'

const TextBlock = {
    component: TextComponent,
    redux: {
        actions: TEXT_ACTIONS,
        actuonTypes: TEXT_ACTION_TYPES, 
        reducer: TextReducer,
        initialState: newTextInitialState
    },
    persistifier: textPersistifier
}

export default TextBlock