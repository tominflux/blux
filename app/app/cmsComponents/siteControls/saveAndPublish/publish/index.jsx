import React from 'react'
import Button from "../../../abstract/button";
import Octicon, { Globe } from "@primer/octicons-react";


export default function Publish(props) {
    //Events
    const onClick = async () => {
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
    return (
        <Button
            className="blux-save-and-publish__button"
            disabled={props.savingOrPublishing}
            onClick={() => onClick()}    
            tooltip="Publish"
        >
            <Octicon icon={Globe} size="medium"/>
        </Button>
    )
}