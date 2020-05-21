import React from 'react'
import Button from '../../../abstract/button'
import Octicon, { File } from '@primer/octicons-react'


export default function PageBrowserControl(props) {
    return (
        <Button
            className="blux-browser-controls__button"
            onClick={() => onClick()}
        >
            <Octicon icon={File} size={44}/>
        </Button>
    )
}