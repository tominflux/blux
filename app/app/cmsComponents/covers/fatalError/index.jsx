import React from 'react'
import Cover from '../../abstract/cover'
import { cmsify } from '../../cmsify'

function FatalError(props) {
    return (
        <Cover
            message={props.children}
        />
    )
}

export default cmsify(FatalError)