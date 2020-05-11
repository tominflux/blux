//ImageBlock
import ImageBlock from "../blocks/imageBlock"
import IMAGE_BLOCK_ACTIONS from "../blocks/imageBlock/redux/actions"
import IMAGE_BLOCK_ACTION_TYPES from "../blocks/imageBlock/redux/actionTypes"
import ImageBlockReducer, { newImageBlockInitialState } from "../blocks/imageBlock/redux/reducer"
//TextBlock
import TextBlock from "../blocks/textBlock"
import TEXT_BLOCK_ACTIONS from "../blocks/textBlock/redux/actions"
import TEXT_BLOCK_ACTION_TYPES from "../blocks/textBlock/redux/actionTypes"
import TextBlockReducer, { newTextBlockInitialState } from '../blocks/textBlock/redux/reducer'
import textBlockPersistifier from "../blocks/textBlock/persistifier"
//VideoBlock
import VideoBlockReducer, { BLOCK_TYPE_VIDEO, videoBlockInitialState } from "../blocks/videoBlock/redux/reducer"
import VideoBlock from '../blocks/videoBlock'
import VIDEO_BLOCK_ACTIONS from "../blocks/videoBlock/redux/actions"
import VIDEO_BLOCK_ACTION_TYPES from "../blocks/videoBlock/redux/actionTypes"

const defaultBlockMap = new Map([
    [
        "image", {
            component: ImageBlock,
            redux: {
                actions: IMAGE_BLOCK_ACTIONS,
                actionTypes: IMAGE_BLOCK_ACTION_TYPES,
                reducer: ImageBlockReducer,
                initialState: newImageBlockInitialState
            }
        }
    ],
    [
        "text", {
            component: TextBlock,
            redux: {
                actions: TEXT_BLOCK_ACTIONS,
                actionTypes: TEXT_BLOCK_ACTION_TYPES,
                reducer: TextBlockReducer,
                initialState: newTextBlockInitialState
            },
            persistifier: textBlockPersistifier
        }   
    ],
    [
        BLOCK_TYPE_VIDEO, {
            component: VideoBlock,
            redux: {
                actions: VIDEO_BLOCK_ACTIONS,
                actionTypes: VIDEO_BLOCK_ACTION_TYPES,
                reducer: VideoBlockReducer,
                initialState: videoBlockInitialState
            }
        }
    ]
])
let customBlockMap = new Map()
export function registerCustomBlocks(blockDescriptors) {
    const existingEntries = customBlockMap.entries()
    customBlockMap = new Map([
        ...existingEntries,
        ...blockDescriptors
    ])
}
export const getBlockMap = () => new Map([
    ...defaultBlockMap.entries(),
    ...customBlockMap.entries()
])
export const isCustom = blockType => customBlockMap.has(blockType)
