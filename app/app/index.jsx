import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BluxContent from '../app/bluxContent'
import store from './redux/store'
import { Provider } from 'react-redux'
import { registerCustomBlocks } from "./blockMap";
import customComponents from '../../../blux-components'

const Header = customComponents.header
const Footer = customComponents.footer

function App() {
    return (<>
        <Header />
        <BluxContent />
        <Footer />
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
    registerCustomBlocks(customComponents.blocks)
    render()
}