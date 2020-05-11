import React from 'react'
import Button from '../../button'
import Octicon, { Gear } from '@primer/octicons-react'
import './styles.css'

const ConfigureThumb = (props) => {
    return (
        <Button
            className={
                "blux-thumb__configure" + (props.show ?
                    "" : " blux-thumb__configure--hidden"  
                )
            }
            onClick={(e) => {
                e.stopPropagation()
                props.onClick()
            }}
        >
            <Octicon icon={Gear} />
        </Button>
    )
}

export default ConfigureThumb