import React from 'react'
import Button from '../button'
import Octicon, { Gear } from '@primer/octicons-react'
import './styles.css'

const ConfigureButton = (props) => {
    return (
        <Button
            className={
                "blux-configure-button" + (props.show ? 
                    "" : " blux-configure-button--hidden"    
                )
            }
            onClick={() => props.onClick()}
        >
            <Octicon icon={Gear}/>
        </Button>
    )
}

export default ConfigureButton