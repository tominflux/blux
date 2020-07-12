import React from 'react'
import Octicon, { Play } from '@primer/octicons-react'
import './styles.css'

export default function VideoPlaceholder() {
    return (
        <div className="blux-video-block__placeholder">
            <Octicon 
                className="blux-video-block__placeholder-icon"
                icon={Play} 
                size={120} 
            />
        </div>
    )
}