import PageLinkComponent from "./component"

export const ENTITY_PAGE_LINK = "PAGE-LINK"

const PageLinkStrategy = (contentBlock, callback, contentState) => {
    const filterFn = (character) => {
        const entityKey = character.getEntity()
        if (entityKey === null)
            return false
        const entity = contentState.getEntity(entityKey)
        const entityType = entity.getType()
        return (entityType === ENTITY_PAGE_LINK)
    }
    contentBlock.findEntityRanges(filterFn, callback)
}

const PageLinkDecorator = {
    strategy: PageLinkStrategy,
    component: PageLinkComponent
}

export default PageLinkDecorator