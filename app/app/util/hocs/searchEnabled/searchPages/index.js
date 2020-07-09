import { extractAllRawText } from "../../../pageExtractor"

export const SEARCH_RELEVANCE = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
    NONE: 0
}

function determineStringRelevance(searchText, string) {
    const lwrString = string.toLowerCase()
    const lwrSearchTxt = searchText.toLowerCase()
    const splitSearchWords = lwrSearchTxt.split(' ')
    const filteredSearchWords = splitSearchWords.filter(
        searchWord => (searchWord.trim() !== "")
    )
    const splitWordCount = filteredSearchWords.length
    if (splitWordCount === 0) {
        throw new Error("Search text is empty.")
    }
    const wordMatchCount = filteredSearchWords.reduce(
        (accumulatingCount, currentWord) => (   
            accumulatingCount + (
                lwrString.includes(currentWord) ? 1 : 0 
            )
        ), 0
    )
    const matchPercent = 100 * wordMatchCount / splitWordCount
    if (matchPercent > 100 * 2 / 3) {
        return SEARCH_RELEVANCE.HIGH
    }
    if (matchPercent > 100 * 1 / 3) {
        return SEARCH_RELEVANCE.MEDIUM
    }
    if (matchPercent > 100 * 0 / 3) {
        return SEARCH_RELEVANCE.LOW
    }
    return SEARCH_RELEVANCE.NONE           
}

function determinePageRelevance(searchText, page) {
    //ID Relevance
    const idRelevance = determineStringRelevance(searchText, page.id)
    //Text Content Relevance
    const rawText = extractAllRawText(page)
    const textRelevance = determineStringRelevance(searchText, rawText)
    //(
    //  For the future...
    //  Search meta-tags too.
    //)
    //Composite Relevance
    const compositeRelevance = Math.floor(
        idRelevance * 2 / 3 + 
        textRelevance * 1 / 3
    )
    return compositeRelevance
}

/**
 * Search pages that might match the search text and 
 * sorts results based on relevance and how recently they
 * were published.
 * @param {*} searchText 
 * @param {*} pages 
 * @returns Sorted array of pages.
 */
export default function searchPages(searchText, pages) {
    const trimmedSearchText = searchText.trim()
    const results = (
        (trimmedSearchText !== "") ?
            pages.map(
                (page) => ({
                    relevance: determinePageRelevance(trimmedSearchText, page),
                    page    
                })
            ) : 
            pages.map(
                (page) => ({
                    relevance: null,
                    page    
                })
            )
    )
    const filteredResults = results.filter(
        (result) => (result.relevance !== SEARCH_RELEVANCE.NONE)
    )
    const sortedResults = [...filteredResults].sort(
        (resultA, resultB) => {
            if (
                resultA.relevance !== null &&
                resultB.relevance !== null &&
                resultA.relevance !== resultB.relevance
            ) {
                return (resultB.relevance - resultA.relevance)
            } else if (
                resultA.page.publishedDate !== null &&
                resultB.page.publishedDate !== null
            ) {
                return (
                    resultB.page.publishedDate - 
                    resultA.page.publishedDate
                )
            } else {
                if (resultA.page.publishedDate !== null) {
                    return (0 - 1)
                } else if (resultB.page.publishedDate !== null) {
                    return (1 - 0)
                } else {
                    return (
                        resultB.page.modifiedDate -
                        resultA.page.modifiedDate
                    )
                }
            }
        }
    )
    const sortedPages = sortedResults.map(
        (result) => (result.page)
    )
    return sortedPages
}