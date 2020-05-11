import React from 'react'
import PageThumb from './pageThumb'
import './styles.css'
import { splitIntoGroups } from '../../../misc'
const path = require("path")

function PageCol(props) {
    return (
        <div className="col-4 blux-page-browser__page-col">
            <PageThumb
                file={props.file}
            />
        </div>
    )
}

function PageRow(props) {
    return (
        <div className="row blux-page-browser__page-row">
            {
                props.files.map(
                    (file, index) => (
                        <PageCol
                            key={index}
                            file={file}
                        />
                    )
                )
            }
        </div>
    )
}

export default function PageRowCollection(props) {
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
        <div className="blux-page-browser__thumbs">
            {
               fileRows.map(
                    (fileRow, index) => (
                        <PageRow 
                            key={index}
                            files={fileRow}
                        />
                    )
                )
            }
        </div>
    )
}