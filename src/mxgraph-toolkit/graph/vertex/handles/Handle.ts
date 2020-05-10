import mx from "../../../mx";
const { mxHandle, mxUtils } = mx

export class Handle {
  handle: any
  state: any
  defaultPositions: any = {}

  constructor(state: any) {
    this.handle = new mxHandle(state, undefined, undefined);
    this.state = state
  }

  init(): Handle {
    return this
  }

  calcPos(maxB, minB, label = 'pos1'): any {
    const { defaultPositions, state } = this    
    const max = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    return Math.max(maxB, Math.min(minB, max));
  }

  setStyle({bounds, point, pos}, label = 'pos1') {
    const { state } = this
    state.style[label] = Math.round(Math.max(0, Math.min(pos, point.y - bounds.y)));
  }
}
        
