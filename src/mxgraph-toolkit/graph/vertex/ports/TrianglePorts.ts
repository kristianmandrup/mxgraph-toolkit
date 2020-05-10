import { IPorts, BasePorts } from "./BasePorts";

export class TrianglePorts extends BasePorts implements IPorts {
    ports = [];
  
    setPorts() {
      this.inPorts()
      this.outPorts()
    }
  
    inPorts() {
      const { ports } = this
      // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
      ports['in1'] = {x: 0, y: 0, perimeter: true, constraint: 'west'};
      ports['in2'] = {x: 0, y: 0.25, perimeter: true, constraint: 'west'};
      ports['in3'] = {x: 0, y: 0.5, perimeter: true, constraint: 'west'};
      ports['in4'] = {x: 0, y: 0.75, perimeter: true, constraint: 'west'};
      ports['in5'] = {x: 0, y: 1, perimeter: true, constraint: 'west'};
    }
  
    outPorts() {
      const { ports } = this
      ports['out1'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north east'};
      ports['out2'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
      ports['out3'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south east'};  
    }  
  }