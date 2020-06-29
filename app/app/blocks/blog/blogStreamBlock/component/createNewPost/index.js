import { blogPageInitialState } from "../../../../../pages/blog/redux/reducer"

const path = require("path")

const API_ROOT_PAGE = "/api/page/"

export default async function createNewPost(postsFolder) {
    const requestPath = path.join(
        API_ROOT_PAGE, postsFolder
    )
    const pageState = blogPageInitialState()
    const response = await fetch(
        requestPath,
        { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(pageState)
        }
    )
    if (!response.ok) {
        const msg = "Could not create new page."
        alert(msg)
        throw new Error(msg)
    }
    return response
}