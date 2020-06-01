import React from 'react'
import BlogHeader from './header'
import './styles.css'


export default function BlogPage(props) {
    return (
        <div className="blux-blog-page">
            <BlogHeader
                title={props.title}
            />
            <div className="container blux-blog-page__content">
                { props.children }
            </div>
        </div>
    )
}