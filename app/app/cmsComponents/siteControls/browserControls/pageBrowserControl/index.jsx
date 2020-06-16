import React from 'react'
import Button from '../../../abstract/button'
import Octicon, { File } from '@primer/octicons-react'
import PageSelectorModal from '../../../modals/pageSelectorModal'
import refreshPages from '../../../../tasks/refreshPages'


export default function PageBrowserControl(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    //Events
    const onClick = () => {
        setShowSelector(true)
    }
    const onConfirm = () => {
        setShowSelector(false)
        refreshPages()
    }
    //
    return (<>
        <Button
            className="blux-browser-controls__button"
            onClick={() => onClick()}
            tooltip="Page Browser"
        >
            <Octicon icon={File} size={44}/>
        </Button>
        <PageSelectorModal
            show={showSelector}
            onClickAway={() => onConfirm()}
            onConfirm={() => onConfirm()}
            canRename
            canDelete
        />
    </>)
}