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
import SaveAndPublish from '../cmsComponents/saveAndPublish'
import StaticRepoCheck from '../cmsComponents/staticRepoCheck'
import AuthCheck from '../cmsComponents/authCheck'
import { AUTH_STATE } from '../redux/reducer/auth'


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
    authState: state.Auth.authState,
    staticRepoState: {
        checking: state.StaticRepo.checking,
        initialised: state.StaticRepo.initialised,
        initialising: state.StaticRepo.initialising
    },
    pages: state.PageCollection.pages
})
const mapDispatchToProps = { 
    fetchPages, 
    receivePages 
}

function BluxContent(props) {
    //Functions
    const acquirePages = async () => {
        props.fetchPages([])
        const pages = await loadPageStates() 
        props.receivePages(pages)
    }
    //
    if (!isCMS()) {
        React.useEffect(() => {
            acquirePages()
        }, [])
        return (
            (props.pages !== null) ? 
                getCurrentPage(props) :
                getLoadingPage(props)
        )
    }
    //
    const onStaticRepoCheckPass = () => {
        acquirePages()
    }
    //
    return (<>
        <AuthCheck />
        {
            (props.authState === AUTH_STATE.LOGGED_IN) ?
                <StaticRepoCheck
                    onPass={() => onStaticRepoCheckPass()}
                /> : null
        }
        {
            (props.pages !== null) ? 
                getCurrentPage(props) :
                getLoadingPage(props)
        }
    </>)
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BluxContent)
)

