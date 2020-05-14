import mx from "mx";
const { mxPoint, mxRectangle } = mx

export class Builder {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }
  
  // sample: createVertex
  createVertex(graph, label, {pos, size, bounds, ports, port}: any = {}) {
    // NOTE: For non-HTML labels the image must be displayed via the style
    // rather than the label markup, so use 'image=' + image for the style.
    // as follows: v1 = graph.insertVertex(parent, null, label,
    // pt.x, pt.y, 120, 120, 'image=' + image);
    var parent = graph.getDefaultParent();
    size = {
      width: 120,
      height: 120,
      ...size
    }
    const { x, y } = pos
    const { width, height } = size
    const vertex = this.graph.insertVertex(parent, null, label, x, y, width, height);
    vertex.setConnectable(false);  

    if (bounds) {
      const altBounds = this.createAlternateBounds(bounds)    
      // Presets the collapsed size
      vertex.geometry.alternateBounds = altBounds  
    }

    if (port) {
      ports = ports || [port]
    }
    if (ports) {
      this.addPortsTo(vertex, ports)
    }
    return vertex
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

  addPortsTo(vertex, ports) {
    // use WithVertex
  }
}
