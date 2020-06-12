import { CompositeDecorator } from "draft-js"
import LinkDecorator from './link'


const compositeDecorator = new CompositeDecorator([
    LinkDecorator
])

export default compositeDecorator