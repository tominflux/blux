import React from 'react'
import Button from '../../../abstract/button'
import { IconContext } from "react-icons";
import { AiOutlineUpload, AiOutlineFolderAdd } from 'react-icons/ai'
import './styles.css'


export default function MediaSelectorFooter(props) {
    return (
        <div className="row align-items-center">
            <div className="col-5">
                <Button
                    className="blux-media-selector-modal__upload-media-button"
                    onClick={props.onUploadFileClick}
                >
                    <IconContext.Provider value={{ size: "32pt" }}>
                        <AiOutlineUpload/>
                    </IconContext.Provider>
                </Button>
                <Button
                    className="blux-media-selector-modal__new-folder-button"
                    onClick={props.onCreateNewFolderClick}
                >
                    <IconContext.Provider value={{ size: "32pt" }}>
                        <AiOutlineFolderAdd/>
                    </IconContext.Provider>
                </Button>
            </div>
            <div className="col-2">
            </div>
            <div className="col-5">
                <Button
                    disabled={props.confirmDisabled}
                    onClick={props.onConfirm}
                    className="blux-media-selector-modal__confirm-button"
                >
                    OK
                </Button>
            </div>
        </div>
    )
}