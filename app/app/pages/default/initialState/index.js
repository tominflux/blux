import pageInitialState from "../../../page/redux/initialState";


const defaultPageInitialState = (type) => ({
    ...pageInitialState("default")
})

export default defaultPageInitialState