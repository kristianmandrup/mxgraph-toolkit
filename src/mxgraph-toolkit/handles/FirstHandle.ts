import { Handle } from './Handle';
import mx from "../mx";
const { mxPoint } = mx

export class FirstHandle extends Handle {
  defaultPositions: any = {}
  handle: any
    
  init() {
    this.handle.ignoreGrid = true   
    return this         
  }

  // first:
  // 0, Math.min(bounds.height
  // 0, Math.min(pos2
  getPosition(bounds) {
    const posBounds = this.calcPos(0, bounds.height, 'pos2')
    const pos = this.calcPos(0, posBounds, 'pos1')
    return new mxPoint(bounds.getCenterX(), bounds.y + pos);
  }

  setPosition(bounds, point) {
    const pos = this.calcPos(0, bounds.height)
    this.setStyle({bounds, point, pos})
  }

  execute() {
    this.handle.copyStyle('pos1');
  }
}

