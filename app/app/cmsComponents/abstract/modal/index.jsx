import React from 'react'
import './styles.css'
import ModalFooter from './footer'
import { quickObjectCompare } from '../../../misc'


export default function Modal(props) {
    if (!props.show) { return null }
    //Refs
    const ref = React.createRef(null)
    //Events
    const onClick = (e, ref, onClickAway) => {
        if (e.target === ref.current) {
            onClickAway()
        }
    }
    //
    return (
        <div 
            className="blux-modal"
            onClick={
                props.onClickAway ?
                    (e) => onClick(e, ref, props.onClickAway) : null
            }
            ref={ref}
        >
            <div className="container blux-modal__container">
                <h1 className="blux-modal__heading">
                    {props.heading}
                </h1>
                {props.children}
                {
                    props.footer ? 
                        <ModalFooter>
                            {props.footer}
                        </ModalFooter> : null
                }
            </div>
        </div>
    )
}
