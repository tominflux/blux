import React from 'react'
import Navigator from '../../abstract/navigator'
import { NAVIGATOR_THUMB_TYPE } from '../../abstract/navigator/thumbRow/thumbCol'
import Octicon, { File } from '@primer/octicons-react'

const API_ROOT = "/api/page-browser/"

export default function PageNavigator(props) {
    const genereateThumbProps = (responseContent) => {
        const getType = () => {
            switch (responseContent.isFolder) {
                case true:
                    return NAVIGATOR_THUMB_TYPE.FOLDER
                case false:
                    return NAVIGATOR_THUMB_TYPE.ITEM
                default:
                    throw new Error(
                        "'isFolder' neither true or false"
                    )
            }
        }
        return {
            type: getType(),
            name: responseContent.name,
            children: <Octicon icon={File} size='large' />
        }
    }
    const processApiResponse = (response) => (
        response.contents.map(
            (content) => genereateThumbProps(content)
        )
    )
    return (
        <Navigator
            apiPath={API_ROOT}
            processApiResponse={
                (response) => processApiResponse(response)
            }
        />
    )
}