import React from 'react'
import DeleteButton from './deleteButton'
import PublishButton from './publishButton'
import {
    publish, unpublish
} from '../../redux/actions'
import { cmsify } from '../../../cmsComponents/cmsify'
import { connect } from 'react-redux'
import './styles.css'

//Redux mappers
const mapDispatchToProps = {
    publish, unpublish
}


const PageControls = (props) => {
    //
    const onDeleteClick = () => {
        //
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
    return (
        <div className="blux-page-controls">
            <DeleteButton 
                onClick={() => onDeleteClick()}
            />
            <PublishButton 
                isDraft={props.isDraft}
                onClick={() => onPublishClick()}
            />
        </div>
    )
}

const cmsified = cmsify(PageControls)
const connected = connect(null, mapDispatchToProps)(cmsified)
export default connected