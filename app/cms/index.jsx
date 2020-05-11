import "regenerator-runtime/runtime.js";

async function prepareAndRun() {
    const { RUN_TYPE, setRunType } = await import("../app/misc")
    setRunType(RUN_TYPE.CMS)
    const { runApp } = await import("../app")
    runApp()
}

prepareAndRun()