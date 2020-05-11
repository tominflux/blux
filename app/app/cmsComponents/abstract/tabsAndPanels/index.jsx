import React from 'react'
import Tabs from './tabs'
import './styles.css'

export default function TabsAndPanels(props) {
    //
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    //
    const getCurrentTab = () => props.tabs[selectedIndex]
    //
    return (
        <div className="blux-tabs-and-panels">
            <Tabs
                tabs={props.tabs}
                selectedIndex={selectedIndex}
                onTabClick={(index) => setSelectedIndex(index)}
            />
            <div className="blux-tabs-and-panels__panel">
                { getCurrentTab().content }
            </div>
        </div>
    )
}