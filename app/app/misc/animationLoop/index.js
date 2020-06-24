
//Animation Loop
const loopHandleMap = new Map()
export function startLoop(onLoop, onLoopKey = onLoop) {
    let loopHandle = { id: null }
    loopHandleMap.set(onLoopKey, loopHandle)
    //
    let timestamp = Date.now()
    const loopCall = () => {
        if (Date.now() - timestamp > 1000 / 60) {
            timestamp = Date.now()
            onLoop()
        }
        loopHandle.id = requestAnimationFrame(loopCall)
    }
    loopCall()
    return () => {
        if (loopHandle.id !== null) {
            cancelAnimationFrame(loopHandle.id)
        }
    }
}
export function endLoop(onLoop, onLoopKey = null) {
    const _key = onLoopKey || onLoop
    const loopHandle = loopHandleMap.get(_key)
    if (loopHandle.id !== null) {
        cancelAnimationFrame(loopHandle.id)
    }
    loopHandleMap.delete(onLoop)
}