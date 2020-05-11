import React from 'react'
import { blockify } from '../blockify'
import NewImage from './cmsComponents/newImage'
import EditImage from './cmsComponents/editImage'
import MediaSelectorModal from '../../cmsComponents/modals/mediaSelectorModal'
import { MEDIA_IMAGE } from '../../misc'
const path = require("path")
import './styles.css'

function ImageBlock(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    //Events
    const onConfirm = (thumbProps, navigation) => {
        setShowSelector(false)
        const mediaId = path.join(
            navigation, thumbProps.name
        )
        const imgSrc = path.join(
            "/content/media", mediaId
        )
        props.updateImageSrc(imgSrc)
    }
    //
    return (<>
        <div 
            className="blux-image-block"
        >
            {
                (props.src === null) ? 
                    <NewImage 
                        show={props.showCms}
                        onClick={() => setShowSelector(true)}
                    /> :
                    <div className="blux-image-block__img-container">
                        <img 
                            className="blux-image-block__img"
                            src={props.src} 
                            alt={props.alt} 
                        />
                        <EditImage
                            show={props.showCms}
                            onClick={() => setShowSelector(true)}
                        /> 
                    </div>
            }
        </div>
        <MediaSelectorModal
            show={showSelector}
            onClickAway={() => setShowSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirm(thumbProps, navigation)
            }
            mediaFilter={{
                types: [ MEDIA_IMAGE ]
            }}
            canDelete
            canDrop
        />
    </>)
}

export default blockify(ImageBlock)