import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BluxContent from '../app/bluxContent'
import store from './redux/store'
import { Provider } from 'react-redux'
import { registerCustomBlocks } from "./blockMap";
import bluxConfig from '../../../blux-config'

const Header = bluxConfig.header

function App() {
    return (<>
        <Header />
        <BluxContent />
    </>)
}

async function render() {
    const reactContent = () => (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
    ReactDOM.render(
        reactContent(),
        document.getElementById("blux-app")
    )
}

export async function runApp() {
    registerCustomBlocks(bluxConfig.blocks)
    render()
}