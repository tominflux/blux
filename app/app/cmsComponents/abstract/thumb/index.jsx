import React from 'react'
import './styles.css'
import Octicon, { Check } from '@primer/octicons-react'
import DeleteThumb from './deleteThumb'
import ConfigureThumb from './configureThumb'
import { inheritClasses } from '../../../misc'
import Textbox from '../textbox'

const Thumb = (props) => {
    //
    const [hovering, setHovering] = React.useState(false)
    //Sub-Components
    const childrenElements = () => (
        props.children ? (
            <div className="blux-thumb__inner">
                {props.children}
            </div>
        ) : null
    )
    const nameElement = () => (
        props.name ? (
            <Textbox 
                className="blux-thumb__name"
                onClick={(e) => e.stopPropagation()}
                onEnter={
                    props.onRename ?
                        (e) => props.onRename(e.target.value) : null
                }
                readOnly={(!props.canRename)}
            >
                {props.name}
            </Textbox>
        ) : null
    )
    const selectedElement = () => (
        props.selected ? (
            <div className="blux-thumb__selected">
                <Octicon icon={Check} size="large" />
            </div>
        ) : null
    )
    const deleteButtonElement = () => (
        props.showDelete ? (
            <DeleteThumb
                onClick={() => props.onDelete()}
                show={hovering}
            />
        ) : null
    )
    const configureButtonElement = () => (
        props.showConfigure ? (
            <ConfigureThumb
                onClick={() => props.onConfigure()}
                show={hovering}
            />
        ) : null
    )
    const {
        className,
        style,
        onMouseEnter,
        onMouseLeave,
        bgUrl,
        canRename,
        showDelete,
        onRename,
        onDelete,
        showConfigure,
        onConfigure,
        selected,
        name,
        children,
        ...externalProps 
    } = props
    //
    return (
        <div 
            className={inheritClasses(props, "blux-thumb")}
            style={{
                backgroundImage: props.bgUrl ? 
                    "url(" + props.bgUrl + ")" : null,
                ...props.style
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            {...externalProps}
        >
            { childrenElements() }
            { nameElement() }
            { selectedElement() }
            { deleteButtonElement() }
            { configureButtonElement() }
        </div>
    )
}

export default Thumb