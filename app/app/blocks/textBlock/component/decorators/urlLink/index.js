import UrlLinkComponent from "./component"

export const ENTITY_URL_LINK = "URL-LINK"

const UrlLinkStrategy = (contentBlock, callback, contentState) => {
    const filterFn = (character) => {
        const entityKey = character.getEntity()
        if (entityKey === null)
            return false
        const entity = contentState.getEntity(entityKey)
        const entityType = entity.getType()
        return (entityType === ENTITY_URL_LINK)
    }
    contentBlock.findEntityRanges(filterFn, callback)
}

const UrlLinkDecorator = {
    strategy: UrlLinkStrategy,
    component: UrlLinkComponent
}

export default UrlLinkDecorator