import React from 'react'
import { connect } from 'react-redux'
import Octicon, { FileDirectory } from '@primer/octicons-react'
import {
    mediaBrowserNavigate,
    mediaBrowserReceive,
    mediaBrowserFail,
    mediaBrowserSelect
} from '../../../../redux/actions'
import Thumb from '../../../abstract/thumb'
import { 
    getExtension,
    MEDIA_IMAGE,
    MEDIA_VIDEO,
    MEDIA_AUDIO,
    MEDIA_MISC,
    getMediaType
} from '../../../../misc'
const path = require("path")

const PATH_MEDIA_ROOT = "/content/media/"

function FolderThumb(props) {
    const onClick = async (props) => {
        props.mediaBrowserNavigate(props.file.path)
        try {
            const response = await fetch(
                path.join("/api/media/", props.file.path)
            )
            const json = await response.json()
            props.mediaBrowserReceive(json.contents)
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
            props.mediaBrowserSelect(null)
        } else {
            props.mediaBrowserSelect(props.file.name)
        }
    }
    const extension = getExtension(props.file.path)
    const mediaType = getMediaType(extension)
    const name = props.file.name
    const isSelected = (name === props.selected)
    switch (mediaType) {
        case MEDIA_IMAGE: 
            const bgUrl = path.join(
                PATH_MEDIA_ROOT, props.file.path
            )
            return (
                <Thumb 
                    bgUrl={bgUrl} 
                    name={name}
                    selected={isSelected}
                    onClick={()=>onClick(props)}
                />
            )
        default:
            return null
    }
}

const mapStateToProps = (state) => ({
    files: state.MediaBrowser.files,
    selected: state.MediaBrowser.selected
})

const mapDispatchToProps = {
    mediaBrowserNavigate,
    mediaBrowserReceive,
    mediaBrowserFail,
    mediaBrowserSelect
}

function MediaThumb(props) {
    if (props.file.isFolder) {
        return <FolderThumb {...props} />
    } else {
        return <FileThumb {...props} />
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MediaThumb)