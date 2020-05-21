import React from 'react'
import SaveAndPublish from './saveAndPublish'
import BrowserControls from './browserControls'
import { cmsify } from '../cmsify'


function SiteControls(props) {
    return (<>
        <SaveAndPublish />
        <BrowserControls />
    </>)
}

export default cmsify(SiteControls)