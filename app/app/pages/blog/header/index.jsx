import React from 'react'
import './styles.css'


export default function BlogHeader(props) {
    return (
        <div className="blux-blog-header">
            <div className="container">
                <h1 className="blux-blog-header__title">
                    {props.title}
                </h1>
            </div>
        </div>
    )
}