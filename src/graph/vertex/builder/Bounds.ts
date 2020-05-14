import mx from "mx";
const { mxRectangle } = mx

export class Bounds {
  graph: any
  vertex: any

  constructor(graph: any, vertex: any) {
    this.graph = graph
    this.vertex = vertex
  }

  setAlternateBounds(altBounds) {
    this.vertex.geometry.alternateBounds = this.createAlternateBounds(altBounds)
  }
    
  createAlternateBounds(bounds: any = {}) {
    bounds = {
      pos: {
        x: 0,
        y: 0,
        ...bounds.pos || {}
      },
      size: {
        width: 120,
        height: 40,
        ...bounds.size || {}
      }
    }    
    const { pos, size } = bounds
    const { x, y } = pos
    const { width, height } = size
    return new mxRectangle(x, y, width, height);
  }
}
