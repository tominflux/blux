import React from 'react'
import { EditorState, Modifier } from 'draft-js'
import Toggle from '../../../../../../cmsComponents/abstract/toggle'

const getBlockSelectionState = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const selectStartKey = selectionState.getStartKey()
    const selectEndKey = selectionState.getEndKey()
    const blockArray = contentState.getBlocksAsArray()
    const blockStart = contentState.getBlockForKey(selectStartKey)
    const blockEnd = contentState.getBlockForKey(selectEndKey)
    const blockStartIndex = blockArray.indexOf(blockStart)
    const blockEndIndex = blockArray.indexOf(blockEnd)
    return {
        contentState,
        selectionState,
        selectStartKey,
        selectEndKey,
        blockArray,
        blockStart,
        blockEnd,
        blockStartIndex,
        blockEndIndex,
    }
}

const isToggled = (blockIdentifier, editorState) => {
    const blockSelectionState = getBlockSelectionState(editorState)
    for (
        let i=blockSelectionState.blockStartIndex; 
        i<=blockSelectionState.blockEndIndex; 
        i++
    ) {
        const block = blockSelectionState.blockArray[i]
        if (block.getType() !== blockIdentifier)
            return false
    }
    return true
}

const toggle = (blockIdentifier, editorState, updateEditorState) => {
    const blockSelectionState = getBlockSelectionState(editorState)
    const toggled = isToggled(blockIdentifier, editorState)
    const newContentState =
        Modifier.setBlockType(
            blockSelectionState.contentState,
            blockSelectionState.selectionState,
            toggled ? "paragraph" : blockIdentifier
        )
    const newEditorState = EditorState.push(
        editorState, newContentState
    )
    updateEditorState(newEditorState)
}


const generateToggleProps = (props) => ({
    isToggled: () => isToggled(
        props.blockIdentifier, 
        props.editorState
    ),
    toggle: () => toggle(
        props.blockIdentifier, 
        props.editorState, 
        props.updateEditorState
    )
})

export default function BlockToggle(props) {
    const toggleProps = generateToggleProps(props)
    return (
        <Toggle {...toggleProps}>
            {props.children}    
        </Toggle>
    )
}