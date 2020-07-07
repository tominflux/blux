import React from 'react'
import Octicon, { FileMedia } from '@primer/octicons-react'
import './styles.css'

export default function ImagePlaceholder() {
    return (
        <div className="blux-image-block__placeholder">
            <Octicon 
                className="blux-image-block__placeholder-icon"
                icon={FileMedia} 
                size={120} 
            />
        </div>
    )
}