import React from 'react'
import BlogHeader from './header'
import './styles.css'
import { inheritClasses } from '../../../misc'


export default function BlogPageComponent(props) {
    //Events
    const onTitleChange = (newTitle) => props.setTitle(newTitle)
    //
    return (
        <div 
            className={
                inheritClasses(props, "blux-blog-page")
            }
        >
            <BlogHeader
                title={props.title}
                isDraft={props.isDraft}
                publishedDate={props.publishedDate}
                modifiedDate={props.modifiedDate}
                onTitleChange={(newTitle) => onTitleChange(newTitle)}
            />
            <div className="container blux-blog-page__content">
                { props.children }
            </div>
        </div>
    )
}