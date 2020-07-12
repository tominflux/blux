import React from 'react'
import { BsFilePost } from 'react-icons/bs';
const { default: BlogPostPreviewComponent } = require("./component");
const { default: BLOG_POST_PREVIEW_ACTION_TYPES } = require("./redux/actionTypes");
const { default: BLOG_POST_PREVIEW_ACTIONS } = require("./redux/actions");
const { default: BlogPostPreviewReducer, blogPostPreviewInitialState } = require("./redux/reducer");


const BlogPostPreviewBlock = {
    component: BlogPostPreviewComponent,
    redux: {
        actions: BLOG_POST_PREVIEW_ACTIONS,
        actionTypes: BLOG_POST_PREVIEW_ACTION_TYPES,
        reducer: BlogPostPreviewReducer,
        initialState: blogPostPreviewInitialState
    },
    displayName: "Blog Post Preview",
    icon: () => <BsFilePost size={64} />
}

export default BlogPostPreviewBlock