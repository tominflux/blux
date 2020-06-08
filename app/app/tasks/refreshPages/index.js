import store from "../../redux/store"
import { fetchPages, receivePages } from "../../redux/actions"
import { loadPageStates } from "../../persister"



const refreshPages = async () => {
    const fetchAction = fetchPages([])
    store.dispatch(fetchAction)
    const pages = await loadPageStates() 
    const receiveAction = receivePages(pages)
    store.dispatch(receiveAction)
}

export default refreshPages