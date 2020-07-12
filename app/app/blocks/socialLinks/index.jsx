import React from 'react'
import SocialLinksComponent from "./component"
import SocialLinksReducer, { socialLinksInitialState } from "./redux/reducer"
import SOCIAL_LINKS_ACTION_TYPES from "./redux/actionTypes"
import SOCIAL_LINKS_ACTIONS from "./redux/actions"
import Octicon, { Mention } from '@primer/octicons-react'

export const SOCIAL_LINK_TYPE = {
    FACEBOOK: "FACEBOOK",
    INSTAGRAM: "INSTAGRAM",
    /*TWITTER: "TWITTER",
    SPOTIFY: "SPOTIFY",
    YOUTUBE: "YOUTUBE",
    BANDCAMP: "BANDCAMP",*/
    MISC: "MISC"
}

const SocialLinksBlock = {
    component: SocialLinksComponent,
    redux: {
        actions: SOCIAL_LINKS_ACTIONS,
        actionTypes: SOCIAL_LINKS_ACTION_TYPES,
        reducer: SocialLinksReducer,
        initialState: socialLinksInitialState
    },
    displayName: "Social Links",
    icon: () => <Octicon icon={Mention} size='large'/>
}

export default SocialLinksBlock