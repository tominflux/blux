import React from 'react'
import BlockToggle from './blockToggle'
import AlignmentToggle from './alignmentToggle'
import InlineToggle from './inlineToggle'
import LinkToggle from './linkToggle'
import Separator from './separator'
import UrlPromptModal from '../../../../../cmsComponents/modals/urlPromptModal'
import { 
    GrTextAlignLeft, 
    GrTextAlignCenter, 
    GrTextAlignRight
} from 'react-icons/gr'
import { TEXT_ALIGNMENT_STATES } from '../../../redux/actionTypes'
import './styles.css'
import { applyLink } from './linkToggle/editorControls'


export default function Toolbar(props) {
    //State
    const [showUrlPrompt, setShowUrlPrompt] = React.useState(false)
    //Events
    const onConfirmUrl = (url) => {
        const newEditorState = applyLink(props.editorState, url)
        props.updateEditorState(newEditorState)
        setShowUrlPrompt(false)
    }
    //Constants
    const editorToggleProps = {
        editorState: props.editorState,
        updateEditorState: props.updateEditorState
    }
    const alignmentToggleProps = {
        alignmentState: props.alignmentState,
        setAlignment: props.setAlignment
    }
    //Render
    return (<>
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
                <LinkToggle 
                    {...editorToggleProps}
                    showPrompt={() => setShowUrlPrompt(true)}
                />
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
        <UrlPromptModal
            show={showUrlPrompt}
            onClickAway={() => setShowUrlPrompt(false)}
            onConfirm={(url) => onConfirmUrl(url)}
        />
    </>)
}