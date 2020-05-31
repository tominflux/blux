//
import React from 'react'
import Octicon, { FileMedia } from '@primer/octicons-react'
//
import Thumb from '../../../../../cmsComponents/abstract/thumb'
import { inheritClasses } from '../../../../../misc'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'
import './styles.css'

function EditImage(props) {
    return (
        <div 
            className={inheritClasses(props, "blux-image-block__edit")}
        >
            <Thumb 
                className="blux-image-block__edit-thumb"
                onClick={props.onClick}
            >
                <Octicon 
                    icon={FileMedia} 
                    size='medium'
                />
            </Thumb>
        </div>
    )
}

export default cmsify(hideable(EditImage))