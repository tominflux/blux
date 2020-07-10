import React from 'react'
import Button from '../../../../cmsComponents/abstract/button'
import BlockGallery from '../../../../cmsComponents/modals/blockGallery'
import { createBlock } from '../../../../page/redux/actions'
import { connect } from 'react-redux'
import { inheritClasses } from "../../../../misc"
import { cmsify, hideable } from '../../../../cmsComponents/cmsify'
import { getBlockMap } from '../../../../blockMap'
import { newBlockInitialState } from '../../../../block/block/redux/reducer'
import './styles.css'


//Redux mappers
const mapDispatchToProps = { createBlock }

function _CreateBlockButton(props) {
    //State
    const [showBlockGallery, setShowBlockGallery] = React.useState(false)
    //Events 
    const onBlockGalleryConfirm = (thumbProps) => {
        //Close block gallery UI.
        setShowBlockGallery(false)
        //Retrieve selected block.
        const blockMap = getBlockMap()
        const blockKey = thumbProps.blockKey
        console.log(thumbProps)
        if (!blockMap.has(blockKey)) {
            const msg = (
                `Selected block [blockKey=${blockKey}] does `
                `not exist.`
            )
            alert(msg)
            throw new Error(msg)
        }
        const block = blockMap.get(blockKey)
        //Create new block instance state
        const initialStateFn = (
            block.redux ? (
                block.redux.initialState ? 
                    block.redux.initialState : null
            ) : null
        )
        const initialState = (
            initialStateFn ? 
                initialStateFn() :
                newBlockInitialState(blockKey)
        )
        //Dispatch create block redux action.
        createBlock(
            props.pageId,
            props.blockId,
            initialState
        )
    }
    //Render
    return (<>
        <div className={inheritClasses(props, "blux-create-block")}>
            <Button
                className="blux-create-block__button"
                onClick={() => setShowBlockGallery(true)}
            >
                +
            </Button>
        </div>
        <BlockGallery
            onClickAway={() => setShowBlockGallery(false)}
            show={showBlockGallery}
            onConfirm={(thumbProps) => onBlockGalleryConfirm(thumbProps)}
        />
    </>)
}

const connectedCreateBlockButton = 
    connect(null, mapDispatchToProps)(_CreateBlockButton)
const hideableCreateBlockButton = 
    hideable(connectedCreateBlockButton)
const cmsifiedCreateBlockButton = 
    cmsify(hideableCreateBlockButton)

const CreateBlockButton = cmsifiedCreateBlockButton
export default CreateBlockButton


