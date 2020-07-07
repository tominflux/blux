import React from 'react'
import ImageCmsSelectImage from './selectImage'
import ImageCmsApplyExternalLink from './applyExternalLink'
import ImageCmsApplyPageLink from './applyPageLink'
import { inheritClasses } from '../../../../../misc'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'
import './styles.css'

function _ImageCmsOptions(props) {
    return (
        <div className={inheritClasses(props, "blux-image-block__cms")}>
            <ImageCmsSelectImage 
                onClick={props.onSelectImage}
            />
            <ImageCmsApplyPageLink
                onClick={props.onApplyPageLink}
            />
            <ImageCmsApplyExternalLink
                onClick={props.onApplyExternalLink}
            />
        </div>
    )
}

const ImageCmsOptions = cmsify(
    hideable(_ImageCmsOptions)
)
export default ImageCmsOptions