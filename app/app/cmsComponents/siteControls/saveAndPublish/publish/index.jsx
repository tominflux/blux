import React from 'react'
import Button from "../../../abstract/button";
import Octicon, { Globe } from "@primer/octicons-react";
import ConfirmPromptModal from '../../../modals/confirmPromptModal';


export default function Publish(props) {
    //State
    const [showPublishPrompt, setShowPublishPrompt] = React.useState(false)
    //Events
    const onPublish = async () => {
        setShowPublishPrompt(false)
        props.setSavingOrPublishing(true)
        const response = await fetch(
            "/api/publish", 
            { method: "POST" }
        )
        if (response.status !== 200) {
            alert("Could not publish website.")
        }
        props.setSavingOrPublishing(false)
    }
    //
    return (<>
        <Button
            className="blux-save-and-publish__button"
            disabled={props.savingOrPublishing}
            onClick={() => setShowPublishPrompt(true)}    
            tooltip="Publish"
        >
            <Octicon icon={Globe} size="medium"/>
        </Button>
        <ConfirmPromptModal
            show={showPublishPrompt}
            onConfirm={() => onPublish()}
            onCancel={() => setShowPublishPrompt(false)}
            onClickAway={() => setShowPublishPrompt(false)}
        >
            Are you sure you want to publish this site?
            All the changes you have made will be made public.
        </ConfirmPromptModal>
    </>)
}