import React from 'react'
import { Link } from 'react-router-dom'
import { Editor, EditorState } from 'draft-js'
import { blockStyles } from '../../../textBlock/component/blockStyles'
const path = require("path")
import './styles.css'

export default function PostPreview(props) {
    //Ref
    const imgRef = React.createRef()
    //State
    const [isImagePortait, setImagePortrait] = React.useState(false)
    //Effects
    // - Update image orientation
    React.useEffect(() => {
        const imgElement = imgRef.current
        if (imgElement === null)
            return 
        const currentImagePortrait = (imgElement.naturalHeight > imgElement.naturalWidth)
        if (currentImagePortrait !== isImagePortait) {
            setImagePortrait(currentImagePortrait)
        }
    })
    //Getters
    const getPublishedStr = () => {
        const publishedDate = new Date(props.publishedDate)
        const publishedStr = publishedDate.toDateString()
        return publishedStr
    }
    const getModifiedStr = () => {
        const modifiedDate = new Date(props.modifiedDate)
        const modifiedStr = modifiedDate.toDateString()
        return modifiedStr
    }
    //Constants
    const url = path.join("/", props.postPageId)
    const imgClass = "blux-post-preview__image" + (
        isImagePortait ? " blux-post-preview__image--portrait" : ""
    )
    const editorState = (props.previewTextContentState) ? 
        EditorState.createWithContent(props.previewTextContentState) : null
    //Render
    return (
        <Link to={url} className="blux-post-preview">
            <div className="blux-post-preview__container">
                <div className="row align-items-center blux-post-preview__row">
                    <div className="col-lg-3 blux-post-preview__image-col">
                        <div className="blux-post-preview__image-container">
                            <img 
                                ref={imgRef}
                                className={imgClass}
                                src={props.imgSrc}
                                alt=""
                            /> 
                        </div>
                    </div>
                    <div className="col-lg-9 blux-post-preview__text-col">
                        <div className="row align-items-start blux-post-preview__header">
                            <div className="col-md-7">
                                <h1 className="blux-post-preview__title">
                                    {props.title}
                                </h1>
                            </div>
                            <div className="col-md-5">
                                <div className="row blux-post-preview__date-row">
                                    <div className="col">
                                        {
                                            props.isDraft ? 
                                                <span className="blux-post-preview__draft">
                                                    Draft
                                                </span> :
                                                <span className="blux-post-preview__published">
                                                    {`${getPublishedStr()}` }
                                                </span>
                                        }
                                    </div>
                                </div>
                                <div className="row blux-post-preview__date-row">
                                    <div className="col">
                                        <span className="blux-post-preview__modified">
                                            {`Last Edited: ${getModifiedStr()}` }
                                        </span>
                                    </div>
                                </div>
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
                        {
                            (props.readMore) ? (
                                <div className="container text-right">
                                    <div className="row">
                                        <div className="col">
                                            <span className="blux-post-preview__read-more">
                                                Read More...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}