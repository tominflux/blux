import React from 'react'
import { connect } from 'react-redux'
import searchPages from './searchPages'

//Redux Connect Mappers
const mapStateToProps = (state) => ({
    pages: state.PageCollection.pages
})
const mapDispatchToProps = null

//HOC
const searchEnabled = (component) => {
    const InnerComponent = component
    //
    const _searchEnabledComponent = (props) => {
        //Constants
        const { pages, ...innerProps } = props 
        //Functions
        const search = (searchText) => searchPages(searchText, pages)
        //Render
        return (
            <InnerComponent
                search={search}
                {...innerProps}
            />
        )
    }
    //
    const searchEnabledComponent = connect(
        mapStateToProps, mapDispatchToProps
    )(_searchEnabledComponent)
    return searchEnabledComponent
}

export default searchEnabled