import React from 'react'
import MediaThumb from './mediaThumb'
import './styles.css'
import { splitIntoGroups } from '../../../misc'
const path = require("path")

function MediaCol(props) {
    return (
        <div className="col-4 blux-media-browser__media-col">
            <MediaThumb
                file={props.file}
            />
        </div>
    )
}

function MediaRow(props) {
    return (
        <div className="row blux-media-browser__media-row">
            {
                props.files.map(
                    (file, index) => (
                        <MediaCol
                            key={index}
                            file={file}
                        />
                    )
                )
            }
        </div>
    )
}

export default function MediaRowCollection(props) {
    const atRoot = path.relative("/", props.navigation) === ""
    const filePreviousDir = {
        isFolder: true,
        path: path.join(props.navigation, "../"),
        name: "../"
    }
    const files = atRoot ?
        props.files : [ filePreviousDir, ...props.files ]
    const fileRows = splitIntoGroups(files, 3)
    return (
        <div className="blux-media-browser__thumbs">
            {
               fileRows.map(
                    (fileRow, index) => (
                        <MediaRow 
                            key={index}
                            files={fileRow}
                        />
                    )
                )
            }
        </div>
    )
}