import React from 'react'
import Octicon, { FileMedia } from '@primer/octicons-react'
import Button from '../../../../../../cmsComponents/abstract/button'

export default function ImageCmsSelectImage(props) {
    //Render
    return (
        <Button
            className="blux-image-block__options-button"
            tooltip="Select Image"
            onClick={props.onClick}
        >
            <Octicon
                icon={FileMedia}
                size="medium"
            />
        </Button>
    )
}