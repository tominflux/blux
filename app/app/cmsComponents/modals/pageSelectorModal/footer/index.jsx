import React from 'react'
import Button from '../../../abstract/button'
import { IconContext } from "react-icons";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from 'react-icons/ai'
import './styles.css'


export default function PageSelectorFooter(props) {
    return (
        <div className="row align-items-center">
            <div className="col-5">
                <Button
                    className="blux-page-selector-modal__new-page-button"
                    onClick={props.onNewPageClick}
                >
                    <IconContext.Provider value={{ size: "32pt" }}>
                        <AiOutlineFileAdd/>
                    </IconContext.Provider>
                </Button>
                <Button
                    className="blux-page-selector-modal__new-folder-button"
                    onClick={props.onNewFolderClick}
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
                    className="blux-page-selector-modal__confirm-button"
                >
                    OK
                </Button>
            </div>
        </div>
    )
}