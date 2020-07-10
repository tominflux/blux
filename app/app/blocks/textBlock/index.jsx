
import React from 'react'
import TextComponent from './component'
import TEXT_ACTIONS from './redux/actions'
import TEXT_ACTION_TYPES from './redux/actionTypes'
import TextReducer, { newTextInitialState } from './redux/reducer'
import textPersistifier from './persistifier'
import { BsType } from 'react-icons/bs';

const TextBlock = {
    component: TextComponent,
    redux: {
        actions: TEXT_ACTIONS,
        actuonTypes: TEXT_ACTION_TYPES, 
        reducer: TextReducer,
        initialState: newTextInitialState
    },
    persistifier: textPersistifier,
    displayName: "Text",
    icon: () => <BsType size={64} />
    
}

export default TextBlock