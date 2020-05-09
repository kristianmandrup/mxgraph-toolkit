import { Handle } from './Handle';
import mx from "../mx";
const { mxPoint } = mx

export class SecondHandle extends Handle {
  defaultPositions: any = {}
  handle: any
    
  init() {
    this.handle.ignoreGrid = true
    return this    
  }

  // second:
  // 0, Math.min(bounds.height
  // pos1, Math.min(bounds.height
  getPosition(bounds) {
    const posBounds = this.calcPos(0, bounds.height, 'pos1')
    const pos = this.calcPos(posBounds, bounds.height, 'pos2')    
    return new mxPoint(bounds.getCenterX(), bounds.y + pos);
  };
  
  setPosition(bounds, point) {
    const pos = this.calcPos(bounds, 'pos1')              
    this.setStyle({bounds, point, pos}, 'pos2')
  };
  
  execute() {
    this.handle.copyStyle('pos2');
  }
}
