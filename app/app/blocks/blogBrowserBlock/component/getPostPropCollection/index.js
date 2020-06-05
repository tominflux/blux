import textPersistifier from "../../../textBlock/persistifier"
import { ContentState } from "draft-js"
const path = require("path")

const PAGE_BROWSER_API_PATH = "/api/page-browser"
const PAGE_API_PATH = "/api/page"


const getPostPageIds = async (postsFolder) => {
    if (postsFolder === null)
        return []
    const requestPath = path.join(
        PAGE_BROWSER_API_PATH, postsFolder
    )
    const response = await fetch(requestPath)
    if (response.ok) {
        const pathInfo = await response.json()
        if (pathInfo.isFolder) {
            const postFiles = pathInfo.contents.filter(
                (entry) => (entry.isFolder === false)
            )
            const postPageIds = postFiles.map(
                (postFile) => (postFile.id)
            )
            return postPageIds
        } else {
            alert("Blog posts path is not a folder.")
        }
    } else {
        alert("Could not get blog posts.")
    }
}

const getPreviewTextContentState = (postPage) => {
    const blocks = postPage.blocks
    const persistifiedTextBlocks = blocks.filter(
        block => (
            block.type === "text" || 
            block.type === "contained-text"
        )
    )
    if (persistifiedTextBlocks.length > 0) {
        const persistifiedBlock = persistifiedTextBlocks[0]
        const textBlock = textPersistifier.unpersistify(persistifiedBlock)
        const editorState = textBlock.editorState
        const contentState = editorState.getCurrentContent()
        const firstBlock = contentState.getFirstBlock()
        const croppedContentState = ContentState.createFromBlockArray(
            [ firstBlock ]
        )
        return croppedContentState
    } else {
        return null
    }
}

const getPostProps = (postPageId, postPageJson) => {
    const getTitle = () => (postPageJson.title)
    const isDraft = () => (postPageJson.isDraft)
    const getModifiedDate = () => (postPageJson.modifiedDate)
    const getPublishedDate = () => (
        (postPageJson.publishedDate && !isDraft()) ? 
            postPageJson.publishedDate : "N/A"
    )
    const getImgSrc = () => {
        if (postPageJson.imgSrc) {
            return postPageJson.imgSrc
        } else {
            for (const block of postPageJson.blocks) {
                if (block.type === "image") {
                    const imgSrc = block.src
                    return imgSrc
                }
            }
            return null
        }
    }
    const postProps = {
        key: postPageId,
        postPageId: postPageId,
        title: getTitle(),
        isDraft: isDraft(),
        modifiedDate: getModifiedDate(),
        publishedDate: getPublishedDate(),
        imgSrc: getImgSrc(),
        previewTextContentState: getPreviewTextContentState(postPageJson)
    }
    return postProps
}

export default async function getPostPropCollection(postsFolder) {
    const postPageIds = await getPostPageIds(postsFolder)
    const postPropsCollection = []
    for (const postPageId of postPageIds) {
        const postPageUrl = path.join(
            PAGE_API_PATH, postPageId
        )
        const response = await fetch(postPageUrl)
        if (!response.ok) {
            const msg = `Could not fetch page ${postPageId}.`
            alert(msg)
            console.error(msg, response)
        } else {
            const getPageJson = async () => {
                try {
                    const json = await response.json()
                    return json
                } catch (err) {
                    const msg = `Could not parse page '${postPageId}'`
                    alert(msg)
                    console.log(`Response from '${postPageUrl}`, response)
                    throw err
                }
            }
            try {
                const postPageJson = await getPageJson()
                if (postPageJson.type === "blog") {
                    const postProps = getPostProps(postPageId, postPageJson)
                    postPropsCollection.push(postProps)
                }
            } catch (err) {
                console.log(`Skipping page ${postPageId}.`)
                console.error(err)
            }
        }
    }
    return postPropsCollection
}