

const extractVimeoEmbed = (embedSrc) => {
    const vimeoEmbedRegex = /src="(https:\/\/player\.vimeo\.com\/video\/.*)"/
    const matches = embedSrc.match(vimeoEmbedRegex)
    const embedUrl = (matches !== null) ? matches[1] : null
    return (
        embedUrl ? 
            embedUrl : null
    )
}

const extractVimeoUrl = (url) => {
    const vimeoUrlRegex = /https:\/\/vimeo\.com\/(\d*)/
    const matches = url.match(vimeoUrlRegex)
    const videoId = (matches !== null) ? matches[1] : null
    const getEmbedUrl = () => (
        `https://player.vimeo.com/video/${videoId}`
    )
    return (
        videoId ? 
            getEmbedUrl() : null
    )
}

export const extractVimeo = (src) => {
    const embedExtraction = extractVimeoEmbed(src)
    if (embedExtraction) {
        return embedExtraction
    }
    const urlExtraction = extractVimeoUrl(src)
    if (urlExtraction) {
        return urlExtraction
    }
}