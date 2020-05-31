import React from 'react'
import BlockToggle from './blockToggle'
import AlignmentToggle from './alignmentToggle'
import InlineToggle from './inlineToggle'
import Separator from './separator'
import { 
    GrTextAlignLeft, 
    GrTextAlignCenter, 
    GrTextAlignRight
} from 'react-icons/gr'
import { TEXT_ALIGNMENT_STATES } from '../../../redux/actionTypes'
import './styles.css'

export default function Toolbar(props) {
    const editorToggleProps = {
        editorState: props.editorState,
        updateEditorState: props.updateEditorState
    }
    const alignmentToggleProps = {
        alignmentState: props.alignmentState,
        setAlignment: props.setAlignment
    }
    return (
        <div 
            className={
                "blux-toolbar" + 
                (props.show ? 
                    "" : " blux-toolbar--hidden") +
                (props.fixed ?
                    " blux-toolbar--fixed" : "")
            }
        >   
            <div className="blux-toolbar__container">
                <BlockToggle 
                    blockIdentifier="header-one" 
                    {...editorToggleProps}
                >
                    <span style={{fontWeight: 600}}>H</span>
                </BlockToggle>
                <Separator />
                <InlineToggle 
                    styleIdentifier="BOLD" 
                    {...editorToggleProps}
                >
                    <span style={{fontWeight: 600}}>B</span>
                </InlineToggle>
                <InlineToggle 
                    styleIdentifier="ITALIC" 
                    {...editorToggleProps}
                >
                    <span style={{fontStyle: "italic"}}>I</span>
                </InlineToggle>
                <Separator />
                <AlignmentToggle 
                    alignmentType={TEXT_ALIGNMENT_STATES.LEFT}
                    {...alignmentToggleProps}
                >
                    <GrTextAlignLeft />
                </AlignmentToggle>
                <AlignmentToggle 
                    alignmentType={TEXT_ALIGNMENT_STATES.CENTER}
                    {...alignmentToggleProps}
                >
                    <GrTextAlignCenter />
                </AlignmentToggle>
                <AlignmentToggle 
                    alignmentType={TEXT_ALIGNMENT_STATES.RIGHT}
                    {...alignmentToggleProps}
                >
                    <GrTextAlignRight />
                </AlignmentToggle>
                {/*
                <AlignmentToggle 
                    alignmentType={TEXT_BLOCK_ALIGNMENT_STATES.JUSTIFIED}
                    {...alignmentToggleProps}
                >
                    <GrTextAlignFull />
                </AlignmentToggle>
                */}
            </div>
        </div>
    )
}