import React from 'react'
import PostPreview from '../../components/postPreview'
import { getPostProps } from '../../misc/getPostPropCollection'
import PageSelectorModal from '../../../../cmsComponents/modals/pageSelectorModal'
import ConfigureButton from '../../../../cmsComponents/abstract/configureButton'
import { blockify } from '../../../blockify'
import { connect } from 'react-redux'
const path = require("path")
import './styles.css'

const mapStateToProps = (state) => ({
    pages: state.PageCollection.pages
})

function _BlogPostPreviewComponent(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    //Events
    const onConfirm = (thumbProps, navigation) => {
        setShowSelector(false)
        if (thumbProps === null) {
            return
        }
        const pageId = path.join(
            navigation, thumbProps.name
        )
        props.updatePostPageId(pageId)
    }
    //Getters
    const getPostPage = () => {
        const filteredPosts = props.pages.filter(
            (page) => (page.id === props.postPageId)
        )
        if (filteredPosts.length === 0) {
            const msg = (
                `Page with ID '${props.postPageId}' does ` +
                `not exist.`
            )
            alert(msg)
            throw new Error(msg)
        }
        return filteredPosts[0]
    }
    //Constants
    const postProps = (
        (props.postPageId !== null) ?
            getPostProps(
                props.postPageId,
                getPostPage()
            ) : null
    )
    //Render
    return (<>
        <div className="container blog-post-preview__container">
            {
                (props.postPageId !== null) ?
                    <PostPreview
                        { ...postProps }
                        readMore={true}
                    /> : 
                    <div className="blog-post-preview__no-post">
                        <p className="blog-post-preview__no-post-p">
                            No blog post page configured.
                        </p>
                    </div>
            }
            <ConfigureButton
                show={props.showCms}
                onClick={() => setShowSelector(true)}
                tooltip="Configure Post Preview"
            />
            <PageSelectorModal
                show={showSelector}
                onClickAway={() => setShowSelector(false)}
                onConfirm={
                    (thumbProps, navigation) => onConfirm(thumbProps, navigation)
                }
                pageFilter={{
                    types: [ "blog" ]
                }}
                canRename
                canDelete
            />
        </div>
    </>)
}

const BlogPostPreviewComponent = blockify(
    connect(mapStateToProps, null)(_BlogPostPreviewComponent)
)
export default BlogPostPreviewComponent

