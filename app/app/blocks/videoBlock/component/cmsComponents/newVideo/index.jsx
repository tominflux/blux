import React from 'react'
import Thumb from '../../../../../cmsComponents/abstract/thumb'
import Octicon, { Play } from '@primer/octicons-react'
import { cmsify } from '../../../../../cmsComponents/cmsify'
import './styles.css'

function NewVideo(props) {
    return (
        <div className="blux-video-block__new">
            <Thumb onClick={props.onClick}>
                <Octicon icon={Play} size='large'/>
            </Thumb>
        </div>
    )
}

export default cmsify(NewVideo)