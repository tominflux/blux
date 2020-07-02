

export const extractAllRawText = (page) => {
    const blocks = page.blocks
    const textBlocks = blocks.filter(
        block => (block.type === "text" || block.type === "contained-text")
    )
    if (textBlocks.length === 0) {
        return ""
    }
    const contentBlockGroups = textBlocks.map(
        (textBlock) => {
            const editorState = textBlock.editorState
            const contentState = editorState.getCurrentContent()
            const contentBlocks = contentState.getBlocksAsArray()
            return contentBlocks
        }
    )
    const contentBlocks = [].concat.apply([], contentBlockGroups)
    const contentBlocksText = contentBlocks.map(
        contentBlock => contentBlock.getText()
    )
    const rawText = contentBlocksText.join(" ")
    return rawText
}

export const extractImages = (page) => {
    const images = []
    if (page.image) {
        images.push({
            src: page.image.src,
            alt: page.image.alt
        })
    }
    const blocks = page.blocks
    const imageBlocks = blocks.filter(
        block => (block.type === "image")
    )
    for (const imageBlock of imageBlocks) {
        images.push({
            src: imageBlock.src,
            alt: imageBlock.alt
        })
    }
    return images
}