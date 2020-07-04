import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BluxContent from '../app/bluxContent'
import store from './redux/store'
import { Provider } from 'react-redux'
import { registerCustomBlocks } from "./blockMap";
import BluxApp from '../../../blux-app'

const Header = BluxApp.components.header
const Footer = BluxApp.components.footer

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
    registerCustomBlocks(BluxApp.blocks)
    render()
}