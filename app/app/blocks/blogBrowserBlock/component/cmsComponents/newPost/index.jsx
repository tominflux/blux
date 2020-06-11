import React from 'react'
import Button from '../../../../../cmsComponents/abstract/button'
import './styles.css'
import Octicon, { Pencil } from '@primer/octicons-react'
import { cmsify, hideable } from '../../../../../cmsComponents/cmsify'
import { inheritClasses } from '../../../../../misc'

function NewPost(props) {
    return (
        <div 
            className={
                inheritClasses(props, "blux-blog-browser__new-post")
            }
        >
            <Button
                onClick={props.onClick}
                tooltip="Create New Post"
            >
                <Octicon 
                    className="blux-blog-browser__new-post-icon"
                    icon={Pencil} 
                    size={24}
                />
            </Button>
        </div>
    )
}

export default cmsify(hideable(NewPost))