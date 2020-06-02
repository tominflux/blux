const path = require("path")

const PAGE_API = "/api/page"

export default async function getPostPropCollection(postPageIds) {
    const postPropsCollection = []
    for (const postPageId of postPageIds) {
        const postPageUrl = path.join(
            PAGE_API, postPageId
        )
        const postPage = await fetch(postPageUrl)
        const getTitle = () => (postPage.title)
        const isDraft = () => (postPage.isDraft)
        const getModifiedDate = () => (postPage.modifiedDate)
        const getPublishedDate = () => (
            (postPage.publishedDate && !isDraft()) ? 
                postPage.publishedDate : "N/A"
        )
        const getImgSrc = () => {
            if (postPageId.imgSrc) {
                return postPageId.imgSrc
            } else {
                const imgSrc = null
                for (const block of postPage.blocks) {
                    if (block.type === "image") {
                        imgSrc = block.src
                    }
                }
                return imgSrc
            }
        }
        const postProps = {
            title: getTitle(),
            isDraft: isDraft(),
            modifiedDate: getModifiedDate(),
            publishedDate: getPublishedDate(),
            imgSrc: getImgSrc()
        }
        postPropsCollection.push(postProps)
    }
    return postPropsCollection
}