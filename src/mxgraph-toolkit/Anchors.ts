import mx from "./mx";
import { IPosition } from './types';
import { ac } from './AnchorPositions'
const { mxPolyline, mxShape } = mx

export const createAnchor = (): Anchor => {
  return new Anchor()
}

export class Anchor {
  static createConstraint(x, y) {
    return ac(x, y)
  }

  static createConstraintByPos(pos: IPosition) {
    return ac(pos.x, pos.y)
  }

  static createConstraints(positions: IPosition[]) {
    return positions.map(pos => this.createConstraintByPos(pos))
  }

  // apply for all shapes   
  static setShapeConstraints(constraints) {
    mxShape.prototype['constraints'] = constraints
  }

  // edges normally have no anchor constraints  
  static disableEdgeConstraints() {
    mxPolyline.prototype['constraints'] = null;
  }
}


