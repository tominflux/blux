import React from 'react'
import MediaBrowserControl from './mediaBrowserControl'
import PageBrowserControl from './pageBrowserControl'
import './styles.css'

export default function BrowserControls(props) {
    return (
        <div
            className="blux-browser-controls"
        >
            <MediaBrowserControl />
            <PageBrowserControl />
        </div>
    )
}