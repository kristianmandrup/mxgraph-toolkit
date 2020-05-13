// 1,0: top right
// 1,1: bottom right
// -1,0: top left

import { IPosition } from "types"

// -1,1: bottom left
export class PortPosition {
  static topRight(): IPosition {
    return {x: 1, y: 0}
  }

  static bottomRight(): IPosition {
    return {x: 1, y: 1}
  }

  static topLeft(): IPosition {
    return {x: -1, y: 0}
  }

  static bottomLeft(): IPosition {
    return {x: -1, y: 1}
  }
}