import React from 'react'
import Thumb from '../../../../../cmsComponents/abstract/thumb'
import Octicon, { Play } from '@primer/octicons-react'
import { inheritClasses } from '../../../../../misc'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'
import './styles.css'

function EditVideo(props) {
    return (
        <div 
            className={inheritClasses(props, "blux-video-block__edit")}
        >
            <Thumb 
                className="blux-video-block__edit-thumb"
                onClick={props.onClick}
            >
                <Octicon 
                    icon={Play} 
                    size='medium'
                />
            </Thumb>
        </div>
    )
}

export default cmsify(hideable(EditVideo))