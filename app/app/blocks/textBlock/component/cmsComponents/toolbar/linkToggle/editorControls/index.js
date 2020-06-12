import { EditorState, Modifier, SelectionState, RichUtils } from "draft-js"


///////////////
//    READ   //
///////////////

/*
const getSelectedBlocks = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    //Get Selected block keys.
    const selectStartKey = selectionState.getStartKey()
    const selectEndKey = selectionState.getEndKey()
    //Convert to indices.
    const blockArray = contentState.getBlocksAsArray()
    const blockStart = contentState.getBlockForKey(selectStartKey)
    const blockEnd = contentState.getBlockForKey(selectEndKey)
    const blockStartIndex = blockArray.indexOf(blockStart)
    const blockEndIndex = blockArray.indexOf(blockEnd)
    //
    return blockArray.slice(blockStartIndex, blockEndIndex + 1)
}
*/

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

const findLinksInSelectedBlock = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const selectedBlock = getSelectedBlock(editorState)
    const characters = selectedBlock.getCharacterList().toArray()
    const startOffset = 0
    const endOffset = characters.length - 1
    const links = []
    let currentLinkEntityKey = null
    let currentLinkStartOffset = null
    const addLink = (endOffset) => {
        links.push({
            startOffset: currentLinkStartOffset,
            endOffset,
            entityKey: currentLinkEntityKey
        })
    }
    for (let i=startOffset; i<endOffset; i++) {
        //
        const character = characters[i]
        const entityKey = character.getEntity()
        const entity = entityKey ? contentState.getEntity(entityKey) : null
        const entityType = entityKey ? entity.getType() : null
        const isInsideLink = (currentLinkEntityKey !== null)
        //
        if (!isInsideLink) {
            const foundLink = (
                entityKey !== null &&
                entityType === "LINK"
            )
            if (foundLink) {
                currentLinkEntityKey = entityKey
                currentLinkStartOffset = i
            }
        }
        //
        else {
            const foundEndOfLink = (
                entityKey === null ||
                entityType !== "LINK"
            )
            if (foundEndOfLink) {
                const linkEndOffset = i
                addLink(linkEndOffset)
                currentLinkEntityKey = null
                currentLinkStartOffset = null
            }
        }
    }
    const isStillInsideLink = (currentLinkEntityKey !== null)
    if (isStillInsideLink)
        addLink(endOffset)
    return links
}

const filterLinksToSelected = (editorState, links) => {
    const selectionState = editorState.getSelection()
    const selectionStartOffset = selectionState.getStartOffset()
    const selectionEndOffset = selectionState.getEndOffset()
    const filteredLinks = links.filter(
        link => (
            selectionStartOffset < link.endOffset &&
            selectionEndOffset > link.startOffset
        )
    )
    return filteredLinks
}

/*
const findSelectedLinks = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    //Get Selected Block.
    const selectStartKey = selectionState.getStartKey()
    const selectEndKey = selectionState.getEndKey()
    //Convert to indices.
    const blockArray = contentState.getBlocksAsArray()
    const blockStart = contentState.getBlockForKey(selectStartKey)
    const blockEnd = contentState.getBlockForKey(selectEndKey)
    const blockStartIndex = blockArray.indexOf(blockStart)
    const blockEndIndex = blockArray.indexOf(blockEnd)
    const links = [] //{}
    //Iterate through selected blocks.
    for (let i=blockStartIndex; i<=blockEndIndex; i++) {
        //Get block
        const block = blockArray[i]
        //Iterate through characters of block
        const characters = block.getCharacterList().toArray()
        for (const character of characters) {
            //Get entity key at character
            const entityKey = character.getEntity()
            //If not null, there is an entity.
            if (entityKey !== null) {
                //Get entity from entity key
                const entity = contentState.getEntity(entityKey)
                //Check that it's a link.
                if (
                    entity !== null &&
                    entity.getType() === "LINK"
                )
                    //Add it.
                    links.push({
                        entity, entityKey
                    })
            }
        }
    }
    return links
}
*/

export const isToggled = (editorState) => {
    const linksInSelectedBlock = findLinksInSelectedBlock(editorState)
    const selectedLinks = filterLinksToSelected(
        editorState, linksInSelectedBlock
    )
    return (selectedLinks.length > 0)
}


///////////////
//   WRITE   //
///////////////


export const applyLink = (editorState, url) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const contentStateWithEntity = contentState.createEntity(
        "LINK", "MUTABLE", {url: url}
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        selectionState,
        entityKey
    )
    const editorStateWithLinkEntity = EditorState.push(
        editorState, contentStateWithLink
    )
    const editorStateWithLink = /*RichUtils.toggleLink(
        editorStateWithLinkEntity, 
        editorStateWithLinkEntity.getSelection(), 
        entityKey
    )*/ editorStateWithLinkEntity
    return editorStateWithLink
}

export const removeSelectedLinks = (editorState) => {
    //Get selected block
    const selectedBlock = getSelectedBlock(editorState)
    const selectionState = editorState.getSelection()
    const selectedBlockKey = selectedBlock.getKey()
    //Find selected links
    const linksInSelectedBlock = findLinksInSelectedBlock(editorState)
    const selectedLinks = filterLinksToSelected(
        editorState, linksInSelectedBlock
    )
    //Remove links
    const contentState = editorState.getCurrentContent()
    let intermediateContentState = contentState
    for (const link of selectedLinks) {
        const linkSelection = (
            SelectionState
            .createEmpty(selectedBlockKey)
            .set("anchorOffset", link.startOffset)
            .set("focusOffset", link.endOffset)
        )
        intermediateContentState = Modifier.applyEntity(
            intermediateContentState, linkSelection, null
        )
    }
    //Apply new content state.
    const contentStateWithoutLinks = intermediateContentState
    const editorStateWithoutLinkEntities = EditorState.push(
        editorState, contentStateWithoutLinks
    )
    //Toggle links
    let intermediateEditorState = editorStateWithoutLinkEntities
    for (const link of selectedLinks) {
        const linkSelection = (
            SelectionState
            .createEmpty(selectedBlockKey)
            .set("anchorOffset", link.startOffset)
            .set("focusOffset", link.endOffset)
        )
        /*
        intermediateEditorState = RichUtils.toggleLink(
            intermediateEditorState, 
            linkSelection, 
            link.entityKey
        )
        */
    }
    const editorStateWithoutLinks = intermediateEditorState
    return editorStateWithoutLinks
}