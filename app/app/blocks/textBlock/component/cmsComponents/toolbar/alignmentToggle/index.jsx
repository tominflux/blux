import React from 'react'
import Toggle from '../../../../../../cmsComponents/abstract/toggle'
import { TEXT_ALIGNMENT_STATES } from '../../../../redux/actionTypes'


const isToggled = (alignmentType, alignmentState) => (
    (!alignmentState && alignmentType===TEXT_ALIGNMENT_STATES.LEFT) 
    || alignmentState === alignmentType
)

const toggle = (alignmentType, setAlignment) => 
    setAlignment(alignmentType)


const generateToggleProps = (props) => ({
    isToggled: () => isToggled(
        props.alignmentType,
        props.alignmentState,
    ),
    toggle: () => toggle(
        props.alignmentType, 
        props.setAlignment
    )
})


export default function AlignmentToggle(props) {
    const toggleProps = generateToggleProps(props)
    return (
        <Toggle {...toggleProps}>
            {props.children}
        </Toggle>
    )
}