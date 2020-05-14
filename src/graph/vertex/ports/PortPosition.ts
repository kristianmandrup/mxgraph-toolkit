// 1,0: top right
// 1,1: bottom right
// -1,0: top left

import { IPosition } from "types"

// relative positioning for ports depending on the number of ports
export const portDistribution = {
  1: [0.5],
  2: [0.33, 0.66],
  3: [0.25, 0.50, 0.75],
  4: [0.2, 0.4, 0.6, 0.8],
  5: [0.17, 0.33, 0.5, 0.66, 0.83],
  6: [0.14, 0.28, 0.42, 0.56, 0.70, 0.85]
}

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