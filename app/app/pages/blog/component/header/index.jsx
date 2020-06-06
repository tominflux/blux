import React from 'react'
import AutoGrowTextArea from '../../../../cmsComponents/abstract/autoGrowTextarea'
import './styles.css'

export default function BlogHeader(props) {
    //Getters
    const getPublishedStr = () => {
        if (!props.published)
            return null
        const publishedDate = new Date(props.publishedDate)
        const publishedStr = publishedDate.toDateString()
        return publishedStr
    }
    const getModifiedStr = () => {
        const modifiedDate = new Date(props.modifiedDate)
        const modifiedStr = modifiedDate.toDateString()
        return modifiedStr
    }
    //Events
    const onTitleChange = (e) => {
        const newTitle = e.target.value
        props.onTitleChange(newTitle)
    }
    //
    return (
        <div className="blux-blog-header">
            <div className="container">
                <h1 className="blux-blog-header__title">
                    <AutoGrowTextArea
                        className="blux-blog-header__title-textbox"
                        onChange={(e) => onTitleChange(e)}
                    >
                        {props.title}
                    </AutoGrowTextArea>
                </h1>
                <div className="row">
                    <div className="col-6 blux-blog-header__published-col">
                        {
                            props.isDraft ?
                                <span className="blux-blog-header__draft">
                                    Draft
                                </span> :
                                <span className="blux-blog-header__published">
                                    {`Published: ${getPublishedStr()}` }
                                </span>
                        } 
                    </div>
                    <div className="col-6 blux-blog-header__modified-col">
                        <span className="blux-blog-header__modified">
                            {`Last Modified: ${getModifiedStr()}` }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}