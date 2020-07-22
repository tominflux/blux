import React from 'react'
import BlockToggle from './blockToggle'
import AlignmentToggle from './alignmentToggle'
import InlineToggle from './inlineToggle'
import PageLinkToggle from './linkToggle/pageToggle'
import UrlLinkToggle from './linkToggle/urlToggle'
import Separator from './separator'
import PageSelectorModal from '../../../../../cmsComponents/modals/pageSelectorModal'
import UrlPromptModal from '../../../../../cmsComponents/modals/urlPromptModal'
import { applyEntity } from './linkToggle/editorControls'
import { ENTITY_PAGE_LINK } from '../../decorators/pageLink'
import { ENTITY_URL_LINK } from '../../decorators/urlLink'
import { 
    GrTextAlignLeft, 
    GrTextAlignCenter, 
    GrTextAlignRight
} from 'react-icons/gr'
import { TEXT_ALIGNMENT_STATES } from '../../../redux/actionTypes'
const path = require("path")
import './styles.css'
import { cmsify } from '../../../../../cmsComponents/cmsify'


function _Toolbar(props) {
    //State
    const [showPageSelector, setShowPageSelector] = React.useState(false)
    const [showUrlPrompt, setShowUrlPrompt] = React.useState(false)
    //Events
    const onConfirmUrl = (url) => {
        const newEditorState = applyEntity(
            props.editorState, ENTITY_URL_LINK, { url }
        )
        props.updateEditorState(newEditorState)
        setShowUrlPrompt(false)
    }
    const onConfirmPage = (thumbProps, navigation) => {
        const pageId = path.join(
            navigation, thumbProps.name
        )
        const newEditorState = applyEntity(
            props.editorState, ENTITY_PAGE_LINK, { pageId }
        )
        props.updateEditorState(newEditorState)
        setShowPageSelector(false)
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
                <PageLinkToggle
                    {...editorToggleProps}
                    showPrompt={() => setShowPageSelector(true)}
                />
                <UrlLinkToggle 
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
        <PageSelectorModal
            show={showPageSelector}
            onClickAway={() => setShowPageSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirmPage(thumbProps, navigation)
            }
            canRename
            canDelete
        />
    </>)
}

const Toolbar = cmsify(_Toolbar)
export default Toolbar