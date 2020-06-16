import React from 'react'
import Button from '../button'
import Octicon, { Gear } from '@primer/octicons-react'
import './styles.css'
import { inheritClasses } from '../../../misc'

const ConfigureButton = (props) => {
    return (
        <Button
            className={
                inheritClasses(
                    props,
                    "blux-configure-button" + (props.show ? 
                        "" : " blux-configure-button--hidden"    
                    )
                )
            }
            onClick={props.onClick}
            tooltip={props.tooltip}
        >
            <Octicon icon={Gear}/>
        </Button>
    )
}

export default ConfigureButton