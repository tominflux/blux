import React from 'react'
import getPostPropCollection from './getPostPropCollection'
import PostPreview from './postPreview'
import { blockify } from '../../blockify'
import ConfigureButton from '../../../cmsComponents/abstract/configureButton'
const path = require("path")

const PAGE_BROWSER_API_PATH = "/api/page-browser"

function BlogBrowserComponent(props) {
    const [postPropCollection, setPostPropCollection] = 
        React.useState([])
    //Functions
    const refreshPosts = async () => {
        const postPageIds = await getPostPageIds()
        const freshPostPropCollection = await getPostPropCollection(
            postPageIds
        )
        setPostPropCollection(freshPostPropCollection)
    }
    //Getters
    const getPostPageIds = async () => {
        if (props.postsFolder === null)
            return []
        const requestPath = path.join(
            PAGE_BROWSER_API_PATH, props.postsFolder
        )
        const response = await fetch(requestPath)
        if (response.ok) {
            const pathInfo = await response.json()
            if (pathInfo.isFolder) {
                const postFiles = pathInfo.contents.filter(
                    (entry) => (entry.isFolder === false)
                )
                const postPageIds = postFiles.map(
                    (postFile) => (postFile.id)
                )
                return postPageIds
            } else {
                alert("Blog posts path is not a folder.")
            }
        } else {
            alert("Could not get blog posts.")
        }
    }
    const getPostPreviews = () => (
        postPropCollection.map(
            postProps => <PostPreview {...postProps}/>
        )
    )
    //
    React.useEffect(() => {
        refreshPosts()
    }, [])
    //
    const postPreviews = getPostPreviews()
    return (
        <div className="container blux-blog-browser">
            <h1>
                Recent Posts
            </h1>
            { 
                (postPreviews.length > 0) ?
                    postPreviews : (
                        <p style={{paddingBottom: "133pt"}}>
                            No posts found.
                        </p>
                    )
            }
            <ConfigureButton 
                show={props.showCms}
            />
        </div>
    )
}

export default blockify(BlogBrowserComponent)