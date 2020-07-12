import React from 'react'
import BlockOptions from '../../../../../cmsComponents/modals/blockOptions'
import BlockOptionsButton from '../../../../../cmsComponents/modals/blockOptions/button'
import Octicon, { Play, Code } from '@primer/octicons-react'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'


function _VideoCmsOptions(props) {
    return (
        <BlockOptions show={props.show}>
            <BlockOptionsButton
                tooltip="Select Local Video"
                onClick={props.onSelectLocal}
            >
                <Octicon icon={Play} size="medium"/>
            </BlockOptionsButton>
            <BlockOptionsButton
                tooltip="Embed iFrame Video"
                onClick={props.onEmbedIframe}
            >
                <Octicon icon={Code} size="medium"/>
            </BlockOptionsButton>
        </BlockOptions>
    )
}

const VideoCmsOptions = cmsify(
    hideable(_VideoCmsOptions)
)
export default VideoCmsOptions