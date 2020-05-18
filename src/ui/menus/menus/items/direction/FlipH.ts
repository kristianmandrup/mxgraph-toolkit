import mx from 'mx'
import { DirectionItem } from './DirectionItem'
const { mxConstants } = mx

export class FlipH extends DirectionItem {
  flip = {
    name: 'flipH',
    direction: mxConstants.STYLE_FLIPH,
  }
}
