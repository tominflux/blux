import { EditorState, Modifier, SelectionState, RichUtils } from "draft-js"


///////////////
//    READ   //
///////////////

export const checkOnlyOneBlockSelected = (editorState) => {
    const selectionState = editorState.getSelection()
    const selectStartKey = selectionState.getStartKey()
    const selectEndKey = selectionState.getEndKey()
    return (selectStartKey === selectEndKey)
}

const getSelectedBlock = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const selectKey = selectionState.getStartKey()
    const block = contentState.getBlockForKey(selectKey)
    return block
}

const findEntitiesInSelectedBlock = (editorState, entityType) => {
    const contentState = editorState.getCurrentContent()
    const selectedBlock = getSelectedBlock(editorState)
    const characters = selectedBlock.getCharacterList().toArray()
    const startOffset = 0
    const endOffset = characters.length - 1
    const entities = []
    let currentEntityKey = null
    let currentEntityStartOffset = null
    const addEntity = (endOffset) => {
        entities.push({
            startOffset: currentEntityStartOffset,
            endOffset,
            entityKey: currentEntityKey
        })
    }
    for (let i=startOffset; i<endOffset; i++) {
        //
        const character = characters[i]
        const entityKey = character.getEntity()
        const entity = entityKey ? contentState.getEntity(entityKey) : null
        const foundEntityType = entityKey ? entity.getType() : null
        const isInsideSearchEntity = (currentEntityKey !== null)
        //
        if (!isInsideSearchEntity) {
            const foundSearchEntity = (
                entityKey !== null &&
                foundEntityType === entityType
            )
            if (foundSearchEntity) {
                currentEntityKey = entityKey
                currentEntityStartOffset = i
            }
        }
        //
        else {
            const foundEndOfEntity = (
                entityKey !== currentEntityKey
            )
            if (foundEndOfEntity) {
                const entityEndOffset = i
                addEntity(entityEndOffset)
                currentEntityKey = null
                currentEntityStartOffset = null
            }
        }
    }
    const isStillInsideSearchEntity = (currentEntityKey !== null)
    if (isStillInsideSearchEntity)
        addEntity(endOffset)
    return entities
}

const filterEntitiesToSelected = (editorState, entities) => {
    const selectionState = editorState.getSelection()
    const selectionStartOffset = selectionState.getStartOffset()
    const selectionEndOffset = selectionState.getEndOffset()
    const filteredEntities = entities.filter(
        entity => (
            selectionStartOffset < entity.endOffset &&
            selectionEndOffset > entity.startOffset
        )
    )
    return filteredEntities
}

export const isToggled = (editorState, entityType) => {
    const onlyOneBlockSelected = checkOnlyOneBlockSelected(editorState)
    if (!onlyOneBlockSelected)
        return false
    const entitiesInSelectedBlock = findEntitiesInSelectedBlock(
        editorState, entityType
    )
    const selectedEntities = filterEntitiesToSelected(
        editorState, entitiesInSelectedBlock
    )
    return (selectedEntities.length > 0)
}


///////////////
//   WRITE   //
///////////////


export const applyEntity = (editorState, entityType, entityData) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const contentStateWithEntity = contentState.createEntity(
        entityType, "MUTABLE", entityData //e.g. { url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const contentStateWithEntityApplied = Modifier.applyEntity(
        contentStateWithEntity,
        selectionState,
        entityKey
    )
    const editorStateWithEntity = EditorState.push(
        editorState, contentStateWithEntityApplied
    )
    return editorStateWithEntity
}

export const removeSelectedEntities = (editorState, entityType) => {
    //Get selected block
    const selectedBlock = getSelectedBlock(editorState)
    const selectedBlockKey = selectedBlock.getKey()
    //Find selected entities
    const entitiesInSelectedBlock = findEntitiesInSelectedBlock(editorState, entityType)
    const selectedEntities = filterEntitiesToSelected(
        editorState, entitiesInSelectedBlock
    )
    //Remove entities
    const contentState = editorState.getCurrentContent()
    let intermediateContentState = contentState
    for (const entity of selectedEntities) {
        const entitySelection = (
            SelectionState
            .createEmpty(selectedBlockKey)
            .set("anchorOffset", entity.startOffset)
            .set("focusOffset", entity.endOffset)
        )
        intermediateContentState = Modifier.applyEntity(
            intermediateContentState, entitySelection, null
        )
    }
    //Apply new content state.
    const contentStateWithoutEntities = intermediateContentState
    const editorStateWithoutEntities = EditorState.push(
        editorState, contentStateWithoutEntities
    )
    return editorStateWithoutEntities
}