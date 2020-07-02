const { newBlockInitialState } = require("../../block/redux/reducer");

const emptyRedux = (blockName) => ({
    actions: [],
    actionTypes: [],
    reducer: (state, action) => state,
    initialState: () => ({...newBlockInitialState(blockName)})
})

export default emptyRedux