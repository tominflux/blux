import React from 'react'
import Button from '../../button'
import Octicon, { X } from '@primer/octicons-react'
import './styles.css'

const DeleteThumb = (props) => {
    return (
        <Button
            className={
                "blux-thumb__delete" + (props.show ?
                    "" : " blux-thumb__delete--hidden"  
                )
            }
            onClick={(e) => {
                e.stopPropagation()
                props.onClick()
            }}
        >
            <Octicon icon={X} />
        </Button>
    )
}

export default DeleteThumb