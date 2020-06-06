import React from 'react'
import { Link } from 'react-router-dom'
import { Editor, EditorState } from 'draft-js'
import { blockStyles } from '../../../textBlock/component/blockStyles'
const path = require("path")
import './styles.css'

export default function PostPreview(props) {
    const url = path.join("/", props.postPageId)
    const editorState = (props.previewTextContentState) ? 
        EditorState.createWithContent(props.previewTextContentState) : null
    //
    return (
        <Link to={url} className="blux-post-preview">
            <div className="blux-post-preview__container">
                <div className="row align-items-end blux-post-preview__header">
                    <div className="col-6">
                        <h1 className="blux-post-preview__title">
                            {props.title}
                        </h1>
                    </div>
                    <div className="col-2">
                        <i>Draft</i>
                    </div>
                </div>
                <div className="blux-post-preview__body">
                    {
                        editorState ? 
                            <Editor
                                editorState={editorState}
                                blockStyleFn={blockStyles}
                                readOnly={true}
                            /> : null
                    }
                </div>
            </div>
        </Link>
    )
}