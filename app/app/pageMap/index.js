import DefaultPage from '../pages/default'
import LoadingPage from '../pages/loading'
import WorkPage from '../pages/work'


const defaultPageMap = new Map([
    ["default", DefaultPage],
    ["loading", LoadingPage],
    ["work", WorkPage]
])
let customPageMap = new Map()
export function registerCustomPages(pageDescriptors) {
    const existingEntries = customPageMap.entries()
    customPageMap = new Map([
        ...existingEntries,
        ...pageDescriptors
    ])
}
export const getPageMap = () => new Map([
    ...defaultPageMap.entries(),
    ...customPageMap.entries()
])