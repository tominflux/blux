import React from 'react'
import store from '../redux/store'
import Block from '../block'
import PageControls from './cmsComponents/controls'
import { getPageMap } from '../pageMap'
import { getBlockMap } from '../blockMap'
import { createBlockAction as blockActionToAction } from '../block/redux/actions'
import { createActionFromPageAction } from './redux/reducer'


function prepareDispatchersForPage(page, pageId) {
    if (!page.redux) 
        return { }
    const pageActionFns = page.redux.actions
    let pageDispatchers = {}
    for (const key in pageActionFns) {
        const pageActionFn = pageActionFns[key]
        const pageDispatcher = (...params) => {
            const pageAction = pageActionFn(...params)
            const action = createActionFromPageAction(
                pageId, pageAction
            )
            store.dispatch(action)
        }
        pageDispatchers = {
            ...pageDispatchers,
            [key]: pageDispatcher
        }
    }
    return pageDispatchers
}

function prepareDispatchersForBlock(blockProps, pageId) {
    const blockMap = getBlockMap()
    const block = blockMap.get(blockProps.type)
    const blockActionFns = block.redux.actions
    let blockDispatchers = {}
    for (const key in blockActionFns) {
        const blockActionFn = blockActionFns[key]
        const blockDispatcher = (...params) => {
            const blockAction = blockActionFn(...params)
            const action = blockActionToAction(
                pageId, blockProps.id, blockAction
            )
            store.dispatch(action)
        }
        blockDispatchers = {
            ...blockDispatchers,
            [key]: blockDispatcher
        }
    }
    return blockDispatchers
}

export default function Page(props) {
    const pageId = props.id
    const pageMap = getPageMap()
    const pageType = props.type
    const pageTypeExists = pageMap.has(pageType)
    if (!pageTypeExists)
        throw new Error(
            "Page type '" + pageType + "' " + 
            "does not exist."
        )
    const page = pageMap.get(pageType)
    const PageComponent = page.component
    const { header, footer, blocks, ...pageProps } = props
    const pageDispatchers = prepareDispatchersForPage(page, pageId)
    return (
        <PageComponent 
            {...pageProps}
            {...pageDispatchers}
        >
            { header || null }
            {
                blocks.map(
                    (blockProps, index) => {
                        const blockDispatchers = 
                            prepareDispatchersForBlock(
                                blockProps, pageId
                            )
                        return (
                            <Block 
                                key={index}
                                pageId={pageId}
                                {...blockProps}  
                                {...blockDispatchers}
                            />
                        )
                    }
                )
            }
            <PageControls 
                pageId={pageId}
                isDraft={props.isDraft}
                publish={props.publish}
                unpublish={props.unpublish}
            />
            { props.footer || null }
        </PageComponent>
    )
}