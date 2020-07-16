import React from 'react'
import DeleteBlockButton from './cmsComponents/deleteBlockButton'
import MoveBlockControl from './cmsComponents/moveBlockControl'
import CreateBlockButton from './cmsComponents/createBlockButton'
import { isCMS, inheritClasses } from '../../misc'
import './styles.css'

export const blockify = (component) => {
    const InnerComponent = component
    if (!isCMS()) {
        return (props) => (
            <div className={inheritClasses(props, "blux-block")}>
                <InnerComponent {...props} />
            </div>
        )
    } else {
        return (props) => {
            const ref = React.useRef(null)
            const [show, setShow] = React.useState(false)
            const onMouseEnter = (e, props) => {
                setShow(true)
            }
            const onMouseLeave = (e, props) => {
                setShow(false)
            }
            return (
                <div 
                    className={
                        "blux-block" + 
                            (props.className ? " " + props.className : "")
                    }
                    ref={ref}
                    onMouseEnter={(e)=>onMouseEnter(e, props)}
                    onMouseLeave={(e)=>onMouseLeave(e, props)}
                >
                    <InnerComponent {...props} showCms={show} />
                    <MoveBlockControl
                        pageId={props.pageId}
                        blockId={props.id}
                        show={show}
                    />
                    <DeleteBlockButton 
                        pageId={props.pageId}
                        blockId={props.id}
                        show={show}
                    />
                    <CreateBlockButton
                        pageId={props.pageId}
                        blockId={props.id}
                        show={show}
                    />
                </div>
            )
        }
    }
}