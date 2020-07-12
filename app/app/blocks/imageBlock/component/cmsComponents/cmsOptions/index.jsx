import React from 'react'
import BlockOptions from '../../../../../cmsComponents/modals/blockOptions'
import BlockOptionsButton from '../../../../../cmsComponents/modals/blockOptions/button'
import Octicon, { Link, LinkExternal, FileMedia } from '@primer/octicons-react'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'
import './styles.css'

function _ImageCmsOptions(props) {
    return (
        <BlockOptions show={props.show}>
            <BlockOptionsButton
                tooltip="Select Image"
                onClick={props.onSelectImage}
            >
                <Octicon icon={FileMedia} size="medium"/>
            </BlockOptionsButton>
            <BlockOptionsButton
                tooltip="Page Link"
                onClick={props.onApplyPageLink}
            >
                <Octicon icon={Link} size="medium"/>
            </BlockOptionsButton>
            <BlockOptionsButton
                tooltip="External Link"
                onClick={props.onApplyExternalLink}
            >
                <Octicon icon={LinkExternal} size="medium"/>
            </BlockOptionsButton>
        </BlockOptions>
    )
}

const ImageCmsOptions = cmsify(
    hideable(_ImageCmsOptions)
)
export default ImageCmsOptions