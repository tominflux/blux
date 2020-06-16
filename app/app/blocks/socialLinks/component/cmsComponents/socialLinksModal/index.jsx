import React from 'react'
import Modal from '../../../../../cmsComponents/abstract/modal'
import DragAndSwap from '../../../../../cmsComponents/abstract/dragAndSwap'
import SocialLinkIcon from '../../socialLink/icon'
import SocialLinkPrompt from './socialLinkPrompt'
import { cmsify } from '../../../../../cmsComponents/cmsify'


function _SocialLinksModal(props) {
    //State
    const [showLinkPrompt, setShowLinkPrompt] = React.useState(false)
    const [configureIndex, setConfigureIndex] = React.useState(null)
    //Events
    // - Drag-and-Swap Events
    const onDSAddItem = () => {
        setShowLinkPrompt(true)
    }
    const onDSConfigureItem = (index) => {
        setConfigureIndex(index)
        setShowLinkPrompt(true)
    }
    const onDSSwapItems = (indexA, indexB) => {
        props.swapLinks(indexA, indexB)
    }
    const onDSDeleteItem = (index) => {
        console.log(props)
        props.removeLink(index)
    }
    // - Local Events
    const onLinkPromptConfirm = (type, url) => {
        if (configureIndex !== null) {
            props.modifyLink(configureIndex, type, url)
            setConfigureIndex(null)
        } else {
            props.addLink(type, url)
        }
        setShowLinkPrompt(false)
    }
    //Constants
    const thumbs = props.links.map(
        (link, index) => ({
            name: link.url,
            onDelete: () => onDSDeleteItem(index),
            onConfigure: () => onDSConfigureItem(index),
            children: <SocialLinkIcon type={link.type} />
        })
    )
    //Render
    return (<>
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading="Configure Social Links"
        >
            <div className="blux-social-links__drag-and-swap-container">
                <DragAndSwap
                    blockId={props.blockId}
                    thumbs={thumbs}
                    onAddItem={() => onDSAddItem()}
                    onSwapItems={(indexA, indexB) => onDSSwapItems(indexA, indexB)}
                />
            </div>
        </Modal>
        <SocialLinkPrompt
            show={showLinkPrompt}
            onClickAway={() => setShowLinkPrompt(false)}
            onConfirm={(type, url) => onLinkPromptConfirm(type, url)}
        />
    </>)
}


const SocialLinksModal = cmsify(_SocialLinksModal)
export default SocialLinksModal
