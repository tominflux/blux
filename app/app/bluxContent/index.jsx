import React from 'react'
import Page from '../page'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPageById } from '../redux/reducer/pageCollection'
import { fetchPages, receivePages } from '../redux/actions'
import CreateBlockButton from '../blocks/blockify/cmsComponents/createBlockButton'
import { savePageState } from '../persister'
import { isCMS } from '../misc'
import AuthCheck from '../cmsComponents/authCheck'
import SiteControls from '../cmsComponents/siteControls'
import refreshPages from '../tasks/refreshPages'


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
                        <SiteControls />
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
    //State
    const [passedOnce, setPassedOnce] = React.useState(false)
    //Effects
    // - Public Refresh
    if (!isCMS()) {
        React.useEffect(() => {
            refreshPages()
        }, [])
    }
    // - Scroll-to-Top after Link
    const prevLocationRef = React.useRef()
    React.useEffect(() => {
        if (props.location !== prevLocationRef.current) {
            window.scrollTo(0, 0)
            prevLocationRef.current = props.location
        }
    })
    //Events
    const onPass = () => {
        if (!passedOnce) {
            refreshPages()
            setPassedOnce(true)
        }
    }
    //Render
    return (<>
        { 
            isCMS() ? 
                <AuthCheck 
                    onPass={() => onPass()}
                /> : 
                null 
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

