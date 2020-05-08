import mx from "./mx";
import { IPosition } from './types';
const { mxPolyline, mxConnectionConstraint, mxPoint } = mx

export const ac = (x, y) => {
  return new mxConnectionConstraint(new mxPoint(x, y), true)
}

export const acByPos = (pos: IPosition) => {
  return new mxConnectionConstraint(new mxPoint(pos.x, pos.y), true)
}

export class AnchorPositions {
  north = [
    ac(0.25, 0),
    ac(0.5, 0),
    ac(0.75, 0)
  ]

  west = [
    ac(0, 0.25),
    ac(0, 0.5),
    ac(0, 0.75)
  ]

  east = [
    ac(1, 0.25),
    ac(1, 0.5),
    ac(1, 0.75)
  ]

  south = [
    ac(0.25, 1),
    ac(0.5, 1),
    ac(0.75, 1)
  ]

  directions = {
    north: this.north

  }

  constraintsFor(direction: string, count: number): any[] {
    const c = this.directions[direction]
    if (count === 1) return [c[1]]
    if (count === 2) return [c[0], c[2] ]
    return c
  }

  constraintsForDirections(directions: string[], count: number): any {
    return directions.reduce((acc, direction) => {
      acc[direction] = this.constraintsFor(direction, count)
      return acc
    }, {})
  }

  allConstraintsFor(count: number): {} {
    return this.constraintsForDirections(['north', 'east', 'west', 'south'], count)
  }
}