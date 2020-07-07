import React from 'react'
import Octicon, { LinkExternal } from '@primer/octicons-react'
import Button from '../../../../../../cmsComponents/abstract/button'

export default function ImageCmsApplyExternalLink(props) {
    //Render
    return (
        <Button
            className="blux-image-block__options-button"
            tooltip="External Link"
            onClick={props.onClick}
        >
            <Octicon
                icon={LinkExternal}
                size="medium"
            />
        </Button>
    )
}