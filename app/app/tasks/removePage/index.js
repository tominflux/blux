import { pageRemoved } from "../../redux/actions"
import store from "../../redux/store"

const path = require("path")

const API_ROOT = "/api/page-browser/"


const removePage = async (pageId) => {
    const deletePath = path.join(
        API_ROOT, pageId
    )
    const response = await fetch(
        deletePath, { method: "DELETE" }
    )
    if (!response.ok) {
        const msg = `Could not delete page. [pageId=${pageId}]`
        alert(msg)
        throw new Error(msg)
    }
    const pageRemovedAction = pageRemoved(pageId)
    store.dispatch(pageRemovedAction)
}

export default removePage