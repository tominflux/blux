const path = require("path")

const API_ROOT_PAGE = "/api/page/"

export default async function createNewPost(postsFolder) {
    const requestPath = path.join(
        API_ROOT_PAGE, postsFolder
    )
    const pageState = {
        type: "blog",
        title: "Untitled Post",
        draft: true,
        modifiedDate: Date.now(),
        publishedDate: null,
        imgSrc: null,
        blocks: []
    }
    const response = await fetch(
        requestPath,
        { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pageState)
        }
    )
    if (!response.ok) {
        alert("Could not create new page.")
    }
}