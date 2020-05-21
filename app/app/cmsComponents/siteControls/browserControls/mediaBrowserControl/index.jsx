import React from 'react'
import Button from '../../../abstract/button'
import Octicon, { FileMedia } from '@primer/octicons-react'
import MediaSelectorModal from '../../../modals/mediaSelectorModal'

export default function OpenMediaBrowser(props) {
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
            <Octicon icon={FileMedia} size={44}/>
        </Button>
        <MediaSelectorModal
            show={showSelector}
            onClickAway={() => setShowSelector(false)}
            onConfirm={() => setShowSelector(false)}
            canRename
            canDelete
            canDrop
        />
    </>)
}
