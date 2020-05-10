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
  
  // Ports are equal for all shapes...  
  export class ShapePorts extends BasePorts {  
    setPorts() {
      const { ports } = this
      // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
      ports['w'] = {x: 0, y: 0.5, perimeter: true, constraint: 'west'};
      ports['e'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
      ports['n'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north'};
      ports['s'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south'};
      ports['nw'] = {x: 0, y: 0, perimeter: true, constraint: 'north west'};
      ports['ne'] = {x: 1, y: 0, perimeter: true, constraint: 'north east'};
      ports['sw'] = {x: 0, y: 1, perimeter: true, constraint: 'south west'};
      ports['se'] = {x: 1, y: 1, perimeter: true, constraint: 'south east'};
    }
  }