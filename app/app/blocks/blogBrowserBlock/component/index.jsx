import React from 'react'
import getPostPropCollection from './getPostPropCollection'
import PostPreview from './postPreview'
import { blockify } from '../../blockify'
import ConfigureButton from '../../../cmsComponents/abstract/configureButton'
import PageFolderSelectorModal from '../../../cmsComponents/modals/pageFolderSelectorModal'
import NewPost from './cmsComponents/newPost'
import createNewPost from './createNewPost'
import './styles.css'
import refreshPages from '../../../tasks/refreshPages'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    pages: state.PageCollection.pages
})

function BlogBrowserComponent(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    const [postPropCollection, setPostPropCollection] = 
        React.useState([])
    //Functions
    const refreshPosts = async (postsFolder=props.postsFolder) => {
        const freshPostPropCollection = await getPostPropCollection(
            postsFolder, props.pages
        )
        setPostPropCollection(freshPostPropCollection)
    }
    //Getters
    const getPostPreviews = () => (
        postPropCollection.map(
            postProps => <PostPreview {...postProps}/>
        )
    )
    //Events
    const onConfirm = (navigation) => {
        setShowSelector(false)
        props.setPostsFolder(navigation)
        refreshPosts(navigation)
    }
    const onNewPostClick = async () => {
        await createNewPost(props.postsFolder)
        await refreshPages()
        await refreshPosts()        
    }
    //
    React.useEffect(() => {
        refreshPosts()
    }, [])
    //
    const postPreviews = getPostPreviews()
    return (<>
        <div className="blux-blog-browser">
            <div className="container blux-blog-browser__container">
                <h1 className="blux-blog-browser__heading">
                    Recent Posts
                </h1>
                <NewPost 
                    onClick={() => onNewPostClick()}
                    show={props.showCms}
                />
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
                    onClick={() => setShowSelector(true)}
                    tooltip="Configure Blog Stream"
                />
            </div>
        </div>
        <PageFolderSelectorModal
            show={showSelector}
            onClickAway={() => setShowSelector(false)}
            onConfirm={
                (navigation) => 
                    onConfirm(navigation)
            }
            canRename
            canDelete
        />
    </>)
}

const connected = connect(mapStateToProps, null)(BlogBrowserComponent)
const blockified = blockify(connected)
export default blockified