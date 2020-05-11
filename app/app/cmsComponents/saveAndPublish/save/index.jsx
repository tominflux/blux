import React from 'react'
import Button from "../../abstract/button";
import Octicon, { CloudUpload } from "@primer/octicons-react";


export default function Save(props) {
    //Events
    const onClick = async () => {
        props.setSavingOrPublishing(true)
        const response = await fetch(
            "/api/save-state", 
            { method: "POST" }
        )
        if (response.status !== 200) {
            alert("Could not save website state.")
        }
        props.setSavingOrPublishing(false)
    }
    //
    return (
        <Button
            className="blux-save-and-publish__button"
            disabled={props.savingOrPublishing}
            onClick={() => onClick()}    
        >
            <Octicon icon={CloudUpload} size="medium"/>
        </Button>
    )
}