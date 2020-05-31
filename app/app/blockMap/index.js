
import ImageBlock from '../blocks/imageBlock'
import TextBlock from '../blocks/textBlock'
import VideoBlock from '../blocks/videoBlock'

const defaultBlockMap = new Map([
    ["image", ImageBlock],
    ["text", TextBlock],
    ["video", VideoBlock]
])
let customBlockMap = new Map()
export function registerCustomBlocks(blockDescriptors) {
    const existingEntries = customBlockMap.entries()
    customBlockMap = new Map([
        ...existingEntries,
        ...blockDescriptors
    ])
}
export const getBlockMap = () => new Map([
    ...defaultBlockMap.entries(),
    ...customBlockMap.entries()
])
export const isCustom = blockType => customBlockMap.has(blockType)
