import React from 'react'
import { blockify } from '../../blockify'
import ImagePlaceholder from './placeholder'
import ImageCmsOptions from './cmsComponents/cmsOptions'
import MediaSelectorModal from '../../../cmsComponents/modals/mediaSelectorModal'
import UrlPromptModal from '../../../cmsComponents/modals/urlPromptModal'
import PageSelectorModal from '../../../cmsComponents/modals/pageSelectorModal'
import { Link } from 'react-router-dom'
import { MEDIA_IMAGE } from '../../../misc'
const path = require("path")
import './styles.css'

function ImageComponent(props) {
    //State
    const [showMediaSelector, setShowMediaSelector] = React.useState(false)
    const [showPageSelector, setShowPageSelector] = React.useState(false)
    const [showUrlPrompt, setShowUrlPrompt] = React.useState(false)
    //Events
    const onConfirmMedia = (thumbProps, navigation) => {
        setShowMediaSelector(false)
        if (thumbProps === null) //No image selected
            return
        const mediaId = path.join(
            navigation, thumbProps.name
        )
        const imgSrc = path.join(
            "/content/media", mediaId
        )
        props.updateImageSrc(imgSrc)
    }
    const onConfirmPage = (thumbProps, navigation) => {
        const pageId = (
            (thumbProps !== null) ? 
                path.join(
                    navigation, thumbProps.name
                ) : null
        )
        props.setPageLink(pageId)
        setShowPageSelector(false)
    }
    const onConfirmUrl = (url) => {
        console.log(url)
        props.setExternalLink(url)
        setShowUrlPrompt(false)
    }
    //Getters
    const getImage = () => (
        (props.src === null) ? 
            <ImagePlaceholder /> :
            <img 
                className="blux-image-block__img"
                src={props.src} 
                alt={props.alt} 
            />
    )
    const getImageWithLink = () => {
        if (props.pageLink && props.externalLink) {
            const msg = (
                `ImageBlock - Both page link and external link are set. `
                `Page link: ${props.pageLink} | ` 
                `External link: ${props.externalLink}. `
                `Block ID: ${props.id}`
            )
            alert(msg)
            throw new Error(msg)
        }
        if (props.pageLink) {
            return (
                <Link to={props.pageLink}>
                    { getImage() }
                </Link>
            )
        }
        if (props.externalLink) {
            return (
                <a
                    href={props.externalLink}
                    target="_blank"
                >
                    { getImage() }
                </a> 
            )
        }
        return getImage()
    }
    //Render
    return (<>
        <div 
            className="blux-image-block"
        >
            <div className="blux-image-block__img-container">
                { getImageWithLink() }
            </div>
            <ImageCmsOptions
                show={props.showCms}
                onSelectImage={() => setShowMediaSelector(true)}
                onApplyPageLink={() => setShowPageSelector(true)}
                onApplyExternalLink={() => setShowUrlPrompt(true)}
            />
        </div>
        <MediaSelectorModal
            show={showMediaSelector}
            onClickAway={() => setShowMediaSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirmMedia(thumbProps, navigation)
            }
            mediaFilter={{
                types: [ MEDIA_IMAGE ]
            }}
            canRename
            canDelete
            canDrop
        />
        <PageSelectorModal
            show={showPageSelector}
            onClickAway={() => setShowPageSelector(false)}
            onConfirm={
                (thumbProps, navigation) => 
                    onConfirmPage(thumbProps, navigation)
            }
            canRename
            canDelete
        />
        <UrlPromptModal
            show={showUrlPrompt}
            onClickAway={() => setShowUrlPrompt(false)}
            onConfirm={(url) => onConfirmUrl(url)}
        />
    </>)
}

export default blockify(ImageComponent)