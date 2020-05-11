import React from 'react'
import './styles.css'
import ModalFooter from './footer'


export default function Modal(props) {
    if (!props.show) { return null }
    //
    const onClick = (e, ref, onClickAway) => {
        if (e.target === ref.current) {
            onClickAway()
        }
    }
    //
    const ref = React.createRef(null)
    return (
        <div 
            className="blux-modal"
            onClick={
                e => onClick(e, ref, props.onClickAway)
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
