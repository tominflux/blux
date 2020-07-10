import React from 'react'
import Modal from '../../abstract/modal'
import BlockNavigator from '../../navigators/blockNavigator'
import Footer from './footer'
import { cmsify } from '../../cmsify'


function _BlockGallery(props) {
    //State
    const [selected, setSelected] = React.useState(null)
    //Navigator Events
    const onSelect = (thumbProps) => {
        setSelected(thumbProps)
    }
    //Modal Events
    const onConfirm = () => {
        if (props.onConfirm)
            props.onConfirm(selected)
    }
    //Render
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={"Choose a Block"}
            footer={
                <Footer
                    confirmDisabled={props.selected === null}
                    onConfirm={() => onConfirm()}
                />
            }
        >
            <BlockNavigator
                onSelect={
                    (thumbProps) => onSelect(thumbProps)
                }
            />
        </Modal>
    )
}

const BlockGallery = cmsify(_BlockGallery)
export default BlockGallery