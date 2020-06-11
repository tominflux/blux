import React from 'react'
//
import DeleteButton from './deleteButton'
import PublishButton from './publishButton'
import ConfirmPromptModal from '../../../cmsComponents/modals/confirmPromptModal'
//
import removePage from '../../../tasks/removePage'
import refreshPages from '../../../tasks/refreshPages'
import { publish, unpublish } from '../../redux/actions'
//
import { cmsify } from '../../../cmsComponents/cmsify'
import { connect } from 'react-redux'
//
import './styles.css'


//Redux mappers
const mapDispatchToProps = {
    publish, unpublish
}

const PageControls = (props) => {
    //State
    const [showDeletePrompt, setShowDeletePrompt] = React.useState(false)
    const [showPublishPrompt, setShowPublishPrompt] = React.useState(false)
    const [showUnpublishPrompt, setShowUnpublishPrompt] = React.useState(false)
    //Functions
    const deletePage = async () => {
        await removePage(props.pageId)
        await refreshPages()
        //alert("Page deleted.")
    }
    //Events
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
    //Render
    return (<>
        <div className="blux-page-controls">
            <DeleteButton 
                onClick={() => setShowDeletePrompt(true)}
            />
            <PublishButton 
                isDraft={props.isDraft}
                onClick={() => onPublishClick()}
            />
        </div>
        <ConfirmPromptModal
            show={showDeletePrompt}
            onConfirm={() => deletePage()}
            onCancel={() => setShowDeletePrompt(false)}
            onClickAway={() => setShowDeletePrompt(false)}
        >
            Are you sure you want to delete the page 
            '{props.pageId}'? It will not be retrievable later.
        </ConfirmPromptModal>
    </>)
}

const cmsified = cmsify(PageControls)
const connected = connect(null, mapDispatchToProps)(cmsified)
export default connected