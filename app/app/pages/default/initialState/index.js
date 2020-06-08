import pageInitialState from "../../../page/redux/initialState";


const defaultPageInitialState = () => ({
    ...pageInitialState("default")
})

export default defaultPageInitialState