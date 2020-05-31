import React from 'react'
import { RichUtils } from 'draft-js'
import Toggle from '../../../../../../cmsComponents/abstract/toggle'

const isToggled = (styleIdentidier, editorState) => {
    const styles = editorState.getCurrentInlineStyle().toArray()
    for (const style of styles) {
        if (style === styleIdentidier) 
            return true
    }
    return false
}

const toggle = (styleIdentifier, editorState, updateEditorState) => {
    const newEditorState = RichUtils.toggleInlineStyle(
        editorState, styleIdentifier
    )
    updateEditorState(newEditorState)
}

const generateToggleProps = (props) => ({
    isToggled: () => isToggled(
        props.styleIdentifier, 
        props.editorState
    ),
    toggle: () => toggle(
        props.styleIdentifier, 
        props.editorState, 
        props.updateEditorState
    )
})

export default function InlineToggle(props) {
    const toggleProps = generateToggleProps(props)
    return (
        <Toggle {...toggleProps}>
            {props.children}
        </Toggle>
    )
}