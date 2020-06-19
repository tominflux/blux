
import ImageBlock from '../blocks/imageBlock'
import TextBlock from '../blocks/textBlock'
import VideoBlock from '../blocks/videoBlock'
import BlogStreamBlock from '../blocks/blog/blogStreamBlock'
import SocialLinksBlock from '../blocks/socialLinks'
import BlogPostPreviewBlock from '../blocks/blog/blogPostPreviewBlock'

const defaultBlockMap = new Map([
    ["image", ImageBlock],
    ["text", TextBlock],
    ["video", VideoBlock],
    ["blog-stream", BlogStreamBlock],
    ["blog-post-preview", BlogPostPreviewBlock],
    ["social-links", SocialLinksBlock]
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
