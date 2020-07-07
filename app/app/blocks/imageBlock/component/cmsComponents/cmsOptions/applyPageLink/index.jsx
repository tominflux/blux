import React from 'react'
import Octicon, { Link } from '@primer/octicons-react'
import Button from '../../../../../../cmsComponents/abstract/button'

export default function ImageCmsApplyPageLink(props) {
    //Render
    return (
        <Button
            className="blux-image-block__options-button"
            tooltip="Page Link"
            onClick={props.onClick}
        >
            <Octicon
                icon={Link}
                size="medium"
            />
        </Button>
    )
}