import React from 'react'
import './styles.css'
import { inheritClasses } from '../../../misc'

export default function DefaultPageComponent(props) {
    return (
        <div 
            className={
                inheritClasses(props,"blux-default-page")
            }
        >
            { props.children }
        </div>
    )
}