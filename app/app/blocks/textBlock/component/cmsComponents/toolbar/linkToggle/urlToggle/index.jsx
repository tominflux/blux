import React from 'react'
import Octicon, { LinkExternal } from '@primer/octicons-react'
import { isToggled, removeSelectedEntities, checkOnlyOneBlockSelected } from '../editorControls'
import { ENTITY_URL_LINK } from '../../../../decorators/urlLink/index' 
import Toggle from '../../../../../../../cmsComponents/abstract/toggle'

export default function UrlLinkToggle(props) {
    //Functions
    const toggle = async () => {
        const onlyOneBlockSelected = checkOnlyOneBlockSelected(props.editorState)
        if (!onlyOneBlockSelected)
            return
        if (isToggled(props.editorState, ENTITY_URL_LINK)) {
            const newEditorState = removeSelectedEntities(
                props.editorState, ENTITY_URL_LINK
            )
            props.updateEditorState(newEditorState)
        } else {
            props.showPrompt()
        }
    }
    //
    return (<>
        <Toggle
            isToggled={() => isToggled(props.editorState, ENTITY_URL_LINK)}
            toggle={() => toggle()}
            tooltip="External Link"
        >
            <Octicon icon={LinkExternal} />
        </Toggle>
    </>)
}