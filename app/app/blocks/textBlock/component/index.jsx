import React from 'react'
import { blockify } from '../../blockify'
import { Editor } from 'draft-js'
import { blockStyles } from './blockStyles'
import Toolbar from './cmsComponents/toolbar'
import { getElementPosition, isCMS } from '../../../misc'
import { TEXT_ALIGNMENT_STATES } from '../redux/actionTypes'
import 'draft-js/dist/Draft.css';
import './styles.css'

const TextComponent = (props) => {
    const ref = React.useRef(null)
    const [toolbarFixed, setToolbarFixed] = React.useState(false)
    //
    const onScroll = () => {
        if (ref.current === null) return
        const position = getElementPosition(ref.current)
        const toolbarY = position.y - 133
        const scrollY = window.scrollY
        setToolbarFixed(toolbarY < scrollY)
    }
    //
    const onMount = () => 
        window.addEventListener("scroll", ()=>onScroll())
    const onUnmount = () => 
        window.removeEventListener("scroll", ()=>onScroll())
    React.useEffect(() => { onMount(); return onUnmount()}, [])
    //
    const alignmentClass = (
        (props.alignment === TEXT_ALIGNMENT_STATES.LEFT) ?
            " blux-text-block--left" : 
        (props.alignment === TEXT_ALIGNMENT_STATES.CENTER) ?
            " blux-text-block--center" :
        (props.alignment === TEXT_ALIGNMENT_STATES.RIGHT) ?
            " blux-text-block--right" :
        (props.alignment === TEXT_ALIGNMENT_STATES.JUSTIFIED) ?
            " blux-text-block--justified" :
        //default if alignment state is missing
            " blux-text-block--left"
    )
    //
    return (
        <div 
            className={
                "blux-text-block" + alignmentClass
            }
            ref={ref}
        >
            <Toolbar 
                editorState={props.editorState}
                updateEditorState={props.updateEditorState}
                show={props.showCms}
                fixed={toolbarFixed}
                alignmentState={props.alignment}
                setAlignment={props.setAlignment}
            />
            <Editor
                editorState={props.editorState}
                onChange={editorState => props.updateEditorState(editorState)}
                blockStyleFn={blockStyles}
                readOnly={!isCMS()}
            />
        </div>
    )
}

export default blockify(TextComponent)