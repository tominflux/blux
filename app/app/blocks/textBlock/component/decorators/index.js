import { CompositeDecorator } from "draft-js"
import PageLinkDecorator from "./pageLink"
import UrlLinkDecorator from './urlLink'


const compositeDecorator = new CompositeDecorator([
    PageLinkDecorator,
    UrlLinkDecorator
])

export default compositeDecorator