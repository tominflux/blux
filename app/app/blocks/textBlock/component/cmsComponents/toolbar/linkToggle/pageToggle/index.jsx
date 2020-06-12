import React from 'react'
import Octicon, { Link } from '@primer/octicons-react'
import { isToggled, removeSelectedEntities, checkOnlyOneBlockSelected } from '../editorControls'
import { ENTITY_PAGE_LINK } from '../../../../decorators/pageLink/index' 
import Toggle from '../../../../../../../cmsComponents/abstract/toggle'

export default function PageLinkToggle(props) {
    //Functions
    const toggle = async () => {
        const onlyOneBlockSelected = checkOnlyOneBlockSelected(props.editorState)
        if (!onlyOneBlockSelected)
            return
        if (isToggled(props.editorState, ENTITY_PAGE_LINK)) {
            const newEditorState = removeSelectedEntities(
                props.editorState, ENTITY_PAGE_LINK
            )
            props.updateEditorState(newEditorState)
        } else {
            props.showPrompt()
        }
    }
    //
    return (<>
        <Toggle
            isToggled={() => isToggled(props.editorState, ENTITY_PAGE_LINK)}
            toggle={() => toggle()}
            tooltip="Page Link"
        >
            <Octicon icon={Link} />
        </Toggle>
    </>)
}