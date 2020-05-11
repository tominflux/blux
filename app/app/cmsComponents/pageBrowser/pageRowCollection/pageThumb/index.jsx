import React from 'react'
import { connect } from 'react-redux'
import Octicon, { FileDirectory, File } from '@primer/octicons-react'
import {
    pageBrowserNavigate,
    pageBrowserReceive,
    pageBrowserFail,
    pageBrowserSelect
} from '../../../../redux/actions'
import Thumb from '../../../abstract/thumb'
const path = require("path")

const PATH_PAGE_ROOT = "/content/page/"

function FolderThumb(props) {
    const onClick = async (props) => {
        props.pageBrowserNavigate(props.file.path)
        try {
            const response = await fetch(
                path.join("/api/page-browser/", props.file.path)
            )
            const json = await response.json()
            props.pageBrowserReceive(json.contents)
        } catch (err) {
            console.error(
                "Could not retrieve files...\n" + err
            )
        }
    }
    const name = props.file.name
    return (
        <Thumb
            onClick={()=>onClick(props)}
            name={name}
        >
            <Octicon icon={FileDirectory} size='large'/>
        </Thumb>
    )
}

function FileThumb(props) {
    const onClick = (props) => {
        const name = props.file.name
        const isSelected = (name === props.selected)
        if (isSelected) {
            props.pageBrowserSelect(null)
        } else {
            props.pageBrowserSelect(name)
        }
    }
    const name = props.file.name
    const isSelected = (name === props.selected)
    return (
        <Thumb 
            name={name}
            selected={isSelected}
            onClick={()=>onClick(props)}
        >
            <Octicon icon={File} size='large'/>
        </Thumb>
    )
}

const mapStateToProps = (state) => ({
    files: state.PageBrowser.files,
    selected: state.PageBrowser.selected
})

const mapDispatchToProps = {
    pageBrowserNavigate,
    pageBrowserReceive,
    pageBrowserFail,
    pageBrowserSelect
}

function PageThumb(props) {
    if (props.file.isFolder) {
        return <FolderThumb {...props} />
    } else {
        return <FileThumb {...props} />
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PageThumb)