import SocialLinksComponent from "./component"
import SocialLinksReducer, { socialLinksInitialState } from "./redux/reducer"

export const SOCIAL_LINK_TYPE = {
    FACEBOOK: "FACEBOOK",
    INSTAGRAM: "INSTAGRAM",
    TWITTER: "TWITTER",
    SPOTIFY: "SPOTIFY",
    YOUTUBE: "YOUTUBE",
    BANDCAMP: "BANDCAMP",
    MISC: "MISC"
}

const SocialLinksBlock = {
    component: SocialLinksComponent,
    redux: {
        actions: [],
        actionTypes: [],
        reducer: SocialLinksReducer,
        initialState: socialLinksInitialState
    }
}

export default SocialLinksBlock