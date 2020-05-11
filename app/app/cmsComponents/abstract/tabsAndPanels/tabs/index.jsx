import React from 'react'
import Tab from '../../tab'
import './styles.css'

export default function Tabs(props) {
    return (
        <div className="blux-tabs-and-panels__tabs">
            {
                props.tabs.map(
                    (tab, index) => (
                        <Tab 
                            key={index}
                            selected={index === props.selectedIndex}
                            onClick={() => props.onTabClick(index)}
                        >
                            {tab.name}
                        </Tab>
                    )
                )
            }
        </div>
    )
}