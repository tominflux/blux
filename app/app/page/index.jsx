import React from 'react'
import store from '../redux/store'
import Block from '../block'
import { getPageMap } from '../pageMap'
import { getBlockMap } from '../blockMap'
import { createBlockAction as blockActionToAction } from '../block/redux/actions'


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
    const ThemedPage = pageMap.get(pageType)
    return (
        <ThemedPage>
            { props.header || null }
            {
                props.blocks.map(
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
            { props.footer || null }
        </ThemedPage>
    )
}