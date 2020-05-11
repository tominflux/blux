import React from 'react'
import Page from '../page'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPageById } from '../redux/reducer/pageCollection'
import { fetchPages, receivePages } from '../redux/actions'
import "regenerator-runtime/runtime"
import CreateBlockButton from '../blocks/blockify/cmsComponents/createBlockButton'
import MediaBrowser from '../cmsComponents/mediaBrowser'
import PageBrowser from '../cmsComponents/pageBrowser'
import { savePageState } from '../persister'
import { loadPageStates } from '../persister'
import { isCMS } from '../misc'
import ControlModal from '../cmsComponents/controlModal'
import SaveAndPublish from '../cmsComponents/saveAndPublish'


//Useful functions
const getPageId = props => (
    (props.location.pathname === "/") ? 
        "index" : 
        props.location.pathname.replace(/^\/|\/$/g, '')
)

//Sub-components
const getCurrentPage = props => {
    const pageId = getPageId(props)
    const pageProps = getPageById(pageId, props.pages)
    if (pageProps === null) {
        //404
        return (
            <p>Page not found.</p>
        )
    }
    if (isCMS()) {
        savePageState(pageProps)
    }
    const initialCreateBlockButton = (pageProps.blocks.length === 0) ?
        <CreateBlockButton 
            pageId={pageId}
            show={true}
        /> : null
    return (
        <>
            <Page 
                header={initialCreateBlockButton}
                {...pageProps}
            /> 
            {
                isCMS() ? (
                    <>
                        <MediaBrowser /> 
                        <PageBrowser />
                        <SaveAndPublish />
                    </>
                ) : null
            }
        </>
    )
}
const getLoadingPage = () => (
    <p>Loading...</p>
)

//Redux mappers
const mapStateToProps = (state) => ({
    pages: state.PageCollection.pages
})
const mapDispatchToProps = { fetchPages, receivePages }

//Hooks
const onMount = props => {
    //Inform redux of page fetching.
    props.fetchPages([])
    //Fetch pages
    loadPageStates()
    //Inform redux of page receival.
    .then(pages => {
        //console.log(pages)
        props.receivePages(pages)
    })
}

//Blux Content Component
const BluxContent = props => {
    React.useEffect(() => { onMount(props) }, [])
    return (props.pages !== null) ? 
        getCurrentPage(props) :
        getLoadingPage(props)
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BluxContent)
)

