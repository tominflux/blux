import React from 'react'
import CoverMessage from './coverMessage'
import { cmsify } from '../../cmsify'
import './styles.css'

function Cover(props) {
    return (
        <div className="blux-cover">
            <div className="blux-cover__content-container">
                {
                    (
                        props.message ?
                            <CoverMessage>
                                {props.message}
                            </CoverMessage> : null
                    )
                }
                {props.children}
            </div>
        </div>
    )
}

export default cmsify(Cover)