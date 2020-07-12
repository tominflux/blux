import React from 'react'
import { inheritClasses } from '../../../misc'
import { cmsify, hideable } from '../../cmsify'
import './styles.css'


function _BlockOptions(props) {
    return (
        <div className={inheritClasses(props, "blux-block-options")}>
            {props.children}
        </div>
    )
}


const BlockOptions = cmsify(
    hideable(_BlockOptions)
)
export default BlockOptions