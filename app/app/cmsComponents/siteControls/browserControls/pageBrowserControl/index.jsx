import React from 'react'
import Button from '../../../abstract/button'
import Octicon, { File } from '@primer/octicons-react'
import PageSelectorModal from '../../../modals/pageSelectorModal'


export default function PageBrowserControl(props) {
    //State
    const [showSelector, setShowSelector] = React.useState(false)
    //Events
    const onClick = () => {
        setShowSelector(true)
    }
    //
    return (<>
        <Button
            className="blux-browser-controls__button"
            onClick={() => onClick()}
        >
            <Octicon icon={File} size={44}/>
        </Button>
        <PageSelectorModal
            show={showSelector}
            onClickAway={() => setShowSelector(false)}
            onConfirm={() => setShowSelector(false)}
            canRename
            canDelete
        />
    </>)
}