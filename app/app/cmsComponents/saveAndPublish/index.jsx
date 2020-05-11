import React from 'react'
import Save from './save'
import Publish from './publish'
import { cmsify } from '../cmsify'
import './styles.css'

function SaveAndPublish(props) {
    //State
    const [savingOrPublishing, setSavingOrPublishing] = React.useState(false)
    //
    return (
        <div className="blux-save-and-publish">
            <Save 
                savingOrPublishing={savingOrPublishing}
                setSavingOrPublishing={(value) => setSavingOrPublishing(value)}
            />
            <Publish 
                savingOrPublishing={savingOrPublishing}
                setSavingOrPublishing={(value) => setSavingOrPublishing(value)}
            />
        </div>
    )
}

export default cmsify(SaveAndPublish)