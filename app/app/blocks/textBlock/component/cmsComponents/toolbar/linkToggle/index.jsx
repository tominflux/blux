import React from 'react'
import Octicon, { LinkExternal } from '@primer/octicons-react'
import { isToggled, removeSelectedLinks, checkOnlyOneBlockSelected } from './editorControls'
import Toggle from '../../../../../../cmsComponents/abstract/toggle'

export default function LinkToggle(props) {
    //Functions
    const toggle = async () => {
        const onlyOneBlockSelected = checkOnlyOneBlockSelected(props.editorState)
        if (!onlyOneBlockSelected)
            return
        if (isToggled(props.editorState)) {
            const newEditorState = removeSelectedLinks(props.editorState)
            props.updateEditorState(newEditorState)
        } else {
            props.showPrompt()
        }
    }
    //
    return (<>
        <Toggle
            isToggled={() => isToggled(props.editorState)}
            toggle={() => toggle()}
        >
            <Octicon icon={LinkExternal} />
        </Toggle>
    </>)
}