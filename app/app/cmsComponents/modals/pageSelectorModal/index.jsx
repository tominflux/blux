import React from 'react'
import Modal from '../../abstract/modal'
import PageNavigator from '../../navigators/pageNavigator'
import { cmsify } from '../../cmsify'

function PageSelectorModal(props) {
    //State
    const [navigation, setNavigation] = React.useState("./")
    const [selected, setSelected] = React.useState(null)
    const [externalMostRecentFetch, setExternalMostRecentFetch]
        = React.useState(null)
    //Navigator Events
    const onNavigate = (navigation) => {
        setNavigation(navigation)
    }
    const onSelect = (thumbProps) => {
        setSelected(thumbProps)
    }
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={navigation}
        >
            <PageNavigator
                onNavigate={
                    (navigation) => onNavigate(navigation)
                }
                onSelect={
                    (thumbProps) => onSelect(thumbProps)
                }
                canSelect={true}
                canRename={props.canRename}
                canDelete={props.canDelete}
                canDrop={props.canDrop}
                externalMostRecentFetch={externalMostRecentFetch}
            />
        </Modal>
    )
}


export default cmsify(PageSelectorModal)