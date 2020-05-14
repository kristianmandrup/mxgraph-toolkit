import { BasePorts } from './BasePorts'
import { IPosition } from 'types';

// Ports are equal for all shapes...  
export class ShapePorts extends BasePorts {  
  setPorts() {
    const { ports, createPort } = this
    // NOTE: Constraint is used later for orthogonal edge routing (currently ignored)
    ports['w'] = createPort({x: 0, y: 0.5}, 'west')
    ports['e'] = createPort({x: 1, y: 0.5}, 'east') 
    ports['n'] = createPort({x: 0.5, y: 0}, 'north')
    ports['s'] = createPort({x: 0.5, y: 1}, 'south')

    ports['nw'] = createPort({x: 0, y: 0}, 'north west')
    ports['ne'] = createPort({x: 1, y: 0}, 'north east')
    ports['sw'] = createPort({x: 0, y: 1}, 'south west')
    ports['se'] = createPort({x: 1, y: 1}, 'south east')
  }

  createPort(pos: IPosition, constraint: string, perimeter: boolean = true): any {
    return {x: pos.x, y: pos.y, perimeter, constraint}
  }
}