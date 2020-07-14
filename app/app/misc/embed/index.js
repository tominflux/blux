import { extractVimeo } from "./vimeo"
import { MEDIA_VIDEO } from ".."


export const extractEmbed = (src) => {
    const vimeoEmbed = extractVimeo(src)
    if (vimeoEmbed) {
        return {
            type: MEDIA_VIDEO,
            src: vimeoEmbed
        }
    }
    return null
}