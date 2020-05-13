import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxPoint, mxRectangle } = mx

class VertexBuilder {
  graph: any
  defaults = {
    port: {
      style: 'align=right;imageAlign=right;spacingRight=18;'
    }
  }

  constructor(graph: any) {
    this.graph = graph
  }

  createPort(vertex, props: any) {
    const {label, pos, size, imagePath, style, offset} = props
    // Adds the ports at various relative locations
    const port = this.graph.insertVertex(vertex, null, label, pos.x, pos.y, size.width, size.height,
        `port;image=${imagePath};` + style, true);
    port.geometry.offset = new mxPoint(offset.x, offset.y);
    return port
  }
  
  protected portPropsFor(props: any) {
    let { label, size, pos, style, imagePath, offset } = props
    const defaults = {
      pos: {
        x: 0,
        y: 0.25,
      },
      offset: {
        x: -6, 
        y: -8
      },
      size: { 
        height: 16, 
        width: 16 
      },      
    }
    size = {
      ...defaults.size,
      ...size || {}
    }
    pos = {
      ...defaults.pos,
      ...pos || {}
    }
    offset = {
      ...defaults.offset,
      ...offset || {}
    }
    style = style || this.defaults.port.style
    if (!label) {
      throw new Error('Missing label')
    }
    if (!imagePath) {
      throw new Error('Missing imagePath')
    }
    return {label, size, pos, offset, imagePath, style} 
  }
  
  // sample: createPorts
  createPorts = (vertex, ports: any[]) => {
    const { graph } = this
  
    ports.map(port => {
      const props = this.portPropsFor(port)
      // Adds the ports at various relative locations
      this.createPort(vertex, props)
    })    
  }
  
  // sample: createVertex
  createVertex(graph, label, pos, size, bounds: any = {}) {
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

    const altBounds = this.createAlternateBounds(bounds)    
    // Presets the collapsed size
    vertex.geometry.alternateBounds = altBounds
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
}
