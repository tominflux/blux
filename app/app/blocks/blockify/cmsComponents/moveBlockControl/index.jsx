import React from 'react'
import Button from '../../../../cmsComponents/abstract/button'
import { 
    moveBlockUp,
    moveBlockDown
} from '../../../../page/redux/actions'
import Octicon, { ChevronUp, ChevronDown } from '@primer/octicons-react'
import './styles.css'
import { connect } from 'react-redux'
import { cmsify } from '../../../../cmsComponents/cmsify'


const mapDispatchToProps = { 
    moveBlockUp,
    moveBlockDown
}

const MoveBlockControl = (props) => {
    const onUpClick = (e, props) => {
        props.moveBlockUp(props.pageId, props.blockId)
    }
    const onDownClick = (e, props) => {
        props.moveBlockDown(props.pageId, props.blockId)
    }
    return (
        <div 
            className={
                "blux-move-block" + (props.show ? 
                    "" : " blux-move-block--hidden"    
                )
            }
        >
            <Button
                className={"blux-move-block__button"}
                onClick={(e) => onUpClick(e, props)}
            >
                <Octicon icon={ChevronUp} size={22}/>
            </Button>
            <Button
                className={
                    "blux-move-block__button" + (props.show ? 
                        "" : " blux-move-block__button--hidden"    
                    )
                }
                onClick={(e) => onDownClick(e, props)} 
            >
                <Octicon icon={ChevronDown} size={22} />
            </Button>
        </div>
    )
}

export default cmsify(
    connect( 
        null, mapDispatchToProps    
    )(MoveBlockControl)
)