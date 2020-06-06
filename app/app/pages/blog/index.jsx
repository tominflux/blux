import React from 'react'
import BlogHeader from './header'
import './styles.css'


export default function BlogPage(props) {
    return (
        <div className="blux-blog-page">
            <BlogHeader
                title={props.title}
                isDraft={props.draft}
                publishedDate={props.publishedDate}
                modifiedDate={props.modifiedDate}
            />
            <div className="container blux-blog-page__content">
                { props.children }
            </div>
        </div>
    )
}