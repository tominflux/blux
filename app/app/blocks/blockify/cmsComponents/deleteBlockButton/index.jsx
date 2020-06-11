import React from 'react'
import { connect } from 'react-redux'
import { deleteBlock } from '../../../../page/redux/actions'
import Button from '../../../../cmsComponents/abstract/button'
import Octicon, {X} from '@primer/octicons-react'
import './styles.css'
import { cmsify } from '../../../../cmsComponents/cmsify'

const mapDispatchToProps = { deleteBlock }

const DeleteBlockButton = (props) => {
    const onClick = (props) =>
        props.deleteBlock(props.pageId, props.blockId)
    return (
        <Button
            className={
                "blux-delete-block" + (props.show ? 
                    "" : " blux-delete-block--hidden"    
                )
            }
            onClick={() => onClick(props)}
            tooltip="Delete Block"
        >
            <Octicon icon={X} />
        </Button>
    )
}

export default cmsify(
    connect(
        null, mapDispatchToProps
    )(DeleteBlockButton)
)