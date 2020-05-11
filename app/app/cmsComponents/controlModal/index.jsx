import React from 'react'
import Modal from '../abstract/modal'
import ConfigureButton from '../abstract/configureButton'
import TabsAndPanels from '../abstract/tabsAndPanels'
import MediaNavigator from '../navigators/mediaNavigator'
import PageNavigator from '../navigators/pageNavigator'

export default function ControlModal(props) {
    //
    const [show, setShow] = React.useState(false)
    //
    const tabs = [
        {
            name: "Pages",
            content: <PageNavigator />
        },
        {
            name: "Media",
            content: <MediaNavigator />
        },
        {
            name: "Settings",
            content: <p>Hello World.</p>
        }
    ]
    //
    return (<>
        <Modal
            show={show}
            onClickAway={() => setShow(false)}
            heading="Control Panel"
        >
            <TabsAndPanels
                tabs={tabs}
            />
        </Modal>
        <ConfigureButton
            show={true}
            onClick={() => setShow(true)}
        />
    </>)
}