import textPersistifier from "../../../textBlock/persistifier"
import { ContentState } from "draft-js"
const path = require("path")

const PAGE_BROWSER_API_PATH = "/api/page-browser"
const PAGE_API_PATH = "/api/page"

/*
const getPostPageIds = async (postsFolder) => {
    if (postsFolder === null)
        return []
    const requestPath = path.join(
        PAGE_BROWSER_API_PATH, postsFolder
    )
    const response = await fetch(requestPath, { credentials: "same-origin" })
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
*/

/*
const getPostPageIds = async (postsFolder, pages) => {
    const postPages = pages.filter((page) => {
        const isBlogPage = (page.type === "blog")
        const parentDir = path.dirname(page.id)
        const isInPostsFolder = (parentDir === postsFolder)
        return (isBlogPage && isInPostsFolder)
    })
    const postPageIds = postPages.map(postPage => postPage.id)
    return postPageIds
}
*/

const getPreviewTextContentState = (postPage) => {
    const blocks = postPage.blocks
    const textBlocks = blocks.filter(
        block => (
            block.type === "text" || 
            block.type === "contained-text"
        )
    )
    if (textBlocks.length > 0) {
        const textBlock = textBlocks[0]
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

export const getPostProps = (postPageId, postPage) => {
    const getTitle = () => (postPage.title)
    const isDraft = () => (postPage.isDraft)
    const getModifiedDate = () => (postPage.modifiedDate)
    const getPublishedDate = () => (
        (postPage.publishedDate && !isDraft()) ? 
            postPage.publishedDate : "N/A"
    )
    const getImgSrc = () => {
        if (postPage.imgSrc) {
            return postPage.imgSrc
        } else {
            for (const block of postPage.blocks) {
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
        previewTextContentState: getPreviewTextContentState(postPage)
    }
    return postProps
}

export default async function getPostPropCollection(postsFolder, pages) {
    const postPages = pages.filter((page) => {
        const isBlogPage = (page.type === "blog")
        const parentDir = path.dirname(page.id)
        const isInPostsFolder = (parentDir === postsFolder)
        return (isBlogPage && isInPostsFolder)
    })
    const postPropsCollection = postPages.map(
        (postPage) => getPostProps(postPage.id, postPage)
    )
    return postPropsCollection
}