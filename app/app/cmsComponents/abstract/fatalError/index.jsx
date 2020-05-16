import React from 'react'
import Cover from '../cover'
import { cmsify } from '../../cmsify'

function FatalError(props) {
    return (
        <Cover
            message={props.message}
        />
    )
}

export default cmsify(FatalError)