import { ISize } from 'types';
import mx from "mx";
const { mxShape } = mx

export interface IPorts {
  setPorts()
}
  
export class BasePorts {
  // ... except for triangles
  ports = [];

  setShapePorts() {
    // Extends shapes classes to return their ports
    mxShape.prototype['getPorts'] = () => this.ports
  }
}
  
  