import React from 'react'
import Button from '../../../../cmsComponents/abstract/button'
import { connect } from 'react-redux'
import { createBlock } from '../../../../page/redux/actions'
import { getBlockMap } from '../../../../blockMap'
import { cmsify } from '../../../../cmsComponents/cmsify'
import './styles.css'


//Redux mappers
const mapDispatchToProps = { createBlock }

//Handlers 
const onUnopenedClick = (openFn) => {
    openFn()
}
const onOpenedClick = (
    selectedType, pageId, blockBeforeId, createBlock, closeFn
) => {
    const blockDescriptor = getBlockMap().get(selectedType)
    const initialStateFn = blockDescriptor.redux.initialState
    const initialState = initialStateFn()
    createBlock(pageId, blockBeforeId, initialState)
    closeFn()
}

//Events
const onButtonClick = (
    opened, openFn, selectedType, pageId, blockBeforeId, createBlock,
    closeFn
) => {
    if (opened === true) {
        onOpenedClick(
            selectedType, pageId, blockBeforeId, createBlock, closeFn
        )
    } else {
        onUnopenedClick(openFn)
    }
}
const onSelectType = (e, setSelectedType) => {
    const newType = e.target.value
    setSelectedType(newType)
}

//
const CreateBlockButton = (props) => {
    const [opened, setOpened] = React.useState(false)
    const [selectedType, setSelectedType] = React.useState("image")
    const blockTypes = [...getBlockMap().keys()]
    /*
    if (props.show === false && opened === true) {
        setOpened(false)
    }
    */
    //Create mouse position observer to check if
    //mouse is very distant from element.
    //If so, close it.
    return (
        <div 
            className={
                "blux-create-block" + (opened ? 
                    "" : " blux-create-block--unopened"
                )
            }
        >
            <select
                className="blux-create-block__select"
                onChange={(e)=>{
                    onSelectType(e, setSelectedType)
                }}
            >
                { 
                    blockTypes.map(
                        (type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        )
                    ) 
                }
            </select>
            <Button 
                className={
                    "blux-create-block__button" + (props.show ? 
                        "" : " blux-create-block__button--hidden"    
                    )
                }
                onClick={()=>{
                    onButtonClick(
                        opened,
                        () => setOpened(true),
                        selectedType, 
                        props.pageId, 
                        props.blockId,
                        props.createBlock,
                        () => setOpened(false)
                    )
                }}
                tooltip="Create New Block"
            >
                +
            </Button>
        </div>
    )
}

export default cmsify(
    connect(
        null, mapDispatchToProps
    )(CreateBlockButton)
)