import { CompositeDecorator } from "draft-js"
import LinkComponent from "./component"


const LinkStrategy = (contentBlock, callback, contentState) => {
    const filterFn = (character) => {
        const entityKey = character.getEntity()
        if (entityKey === null)
            return false
        const entity = contentState.getEntity(entityKey)
        const entityType = entity.getType()
        return (entityType === "LINK")
    }
    contentBlock.findEntityRanges(filterFn, callback)
}

const LinkDecorator = {
    strategy: LinkStrategy,
    component: LinkComponent
}

export default LinkDecorator