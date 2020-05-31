import React from 'react'
import Thumb from '../../../../../cmsComponents/abstract/thumb'
import Octicon, { FileMedia } from '@primer/octicons-react'
import { cmsify } from '../../../../../cmsComponents/cmsify'
import './styles.css'
import { inheritClasses } from '../../../../../misc'

function NewImage(props) {
    return (
        <div className={inheritClasses(props, "blux-image-block__new")}>
            <Thumb onClick={props.onClick}>
                <Octicon icon={FileMedia} size='large'/>
            </Thumb>
        </div>
    )
}

export default cmsify(NewImage)