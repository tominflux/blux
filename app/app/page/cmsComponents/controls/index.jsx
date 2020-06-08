import React from 'react'
import DeleteButton from './deleteButton'
import PublishButton from './publishButton'
import removePage from '../../../tasks/removePage'
import refreshPages from '../../../tasks/refreshPages'
import { publish, unpublish } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { cmsify } from '../../../cmsComponents/cmsify'
import { connect } from 'react-redux'
import './styles.css'

//Redux mappers
const mapDispatchToProps = {
    publish, unpublish
}

const PageControls = (props) => {
    //const [redirect, setRedirect] = React.useState(null)
    //
    const onDeleteClick = async () => {
        await removePage(props.pageId)
        await refreshPages()
        alert("Page deleted.")
        //setRedirect("/")
    }
    const onPublishClick = () => {
        if (props.isDraft === true) {
            const publishedDate = Date.now()
            props.publish(props.pageId, publishedDate)
        } else if (props.isDraft === false) {
            props.unpublish(props.pageId)
        } else {
            const msg = (
                `Page->isDraft neither true or false. ` +
                `[pageId=${props.pageId}]`
            )
            alert(msg)
            throw new Error(msg)
        }
    }
    //
    return (<>
        {/*
            redirect ? 
                <Redirect to={redirect} /> :
                null
        */}
        <div className="blux-page-controls">
            <DeleteButton 
                onClick={() => onDeleteClick()}
            />
            <PublishButton 
                isDraft={props.isDraft}
                onClick={() => onPublishClick()}
            />
        </div>
    </>)
}

const cmsified = cmsify(PageControls)
const connected = connect(null, mapDispatchToProps)(cmsified)
export default connected