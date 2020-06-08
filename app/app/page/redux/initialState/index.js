

const pageInitialState = (type) => ({
    //No need for ID, this is initialised server-side.
    type,
    isDraft: true,
    modifiedDate: Date.now(),
    publishedDate: null,
    blocks: []
})

export default pageInitialState