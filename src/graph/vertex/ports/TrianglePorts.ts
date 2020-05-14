import { IPorts, BasePorts } from "./BasePorts";
import { IPosition } from "types";

export class TrianglePorts extends BasePorts implements IPorts {
  ports = [];

  setPorts() {
    this.inPorts()
    this.outPorts()
  }

  inPorts() {
    const { ports, createPort } = this
    // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
    ports['in1'] = createPort({x: 0, y: 0})
    ports['in2'] = createPort({x: 0, y: 0.25})
    ports['in3'] = createPort({x: 0, y: 0.5})
    ports['in4'] = createPort({x: 0, y: 0.75})
    ports['in5'] = createPort({x: 0, y: 1})
  }

  outPorts() {
    const { ports, createPort } = this
    ports['out1'] = createPort({x: 0.5, y: 0}, 'north east')
    ports['out2'] = createPort({x: 1, y: 0.5}, 'east')
    ports['out3'] = createPort({x: 0.5, y: 1}, 'south east')  
  }  

  createPort(pos: IPosition, constraint: string = 'west', perimeter: boolean = true): any {
    return {x: pos.x, y: pos.y, perimeter, constraint}
  }
}