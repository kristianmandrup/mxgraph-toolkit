import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxRectangle, mxPoint, mxUtils } = mx

export interface IaddSidebarIcon {
  dragBorder?: string
  dragSize?: ISize
  imageSize?: ISize
  vertexSize?: ISize
  createPorts(graph: any, vertex: any)
  createVertex(graph: any, label: string, pos: IPosition, size?: ISize)
}

export const defaultDragElement = () => {
  const dragElt = document.createElement('div');
  dragElt.style.border = 'dashed black 1px';
  dragElt.style.width = '120px';
  dragElt.style.height = '120px';
  return dragElt
}

export class Sidebar {
  graph: any
  sidebarElement: any
  _dragElt: Element = defaultDragElement()

  constructor(graph: any, sidebarElement: any) {
    this.sidebarElement = sidebarElement
  }

  createPort(vertex, props: any) {
    const {label, pos, size, imagePath, style, offset} = props
    // Adds the ports at various relative locations
    const port = this.graph.insertVertex(vertex, null, label, pos.x, pos.y, size.width, size.height,
        `port;image=${imagePath};` + style, true);
    port.geometry.offset = new mxPoint(offset.x, offset.y);
    return port
  }

  portPropsFor(props: any) {
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

    label = label || 'Trigger'
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
    imagePath = imagePath || 'editors/images/overlays/flash.png'
    style = style || 'align=right;imageAlign=right;spacingRight=18;'   
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
  createVertex = (graph, label, pos, size: any = {}) => {
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
    const vertex = graph.insertVertex(parent, null, label, pos.x, pos.y, size.width, size.height);
    vertex.setConnectable(false);
    
    // Presets the collapsed size
    vertex.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);
    return vertex
  }  

  createOnDrag = (label, {createPorts, createVertex, vertexSize, ports}: any = {}) => (graph, evt, cell, x, y) => {  
    var model = graph.getModel();
    createPorts = createPorts || this.createPorts
    createVertex = createVertex || this.createVertex
    const vertex = createVertex(graph, label, {x, y, size: vertexSize})    

    model.beginUpdate();
    try {                
      createPorts(vertex, ports)
    } finally {
      model.endUpdate();
    }
    
    graph.setSelectionCell(vertex);
  }  

  addSidebarIcon(graph, label: string, image, props: IaddSidebarIcon) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.    
    // Creates the image which is used as the sidebar icon (drag source)
    let { imageSize, dragSize, dragBorder } = props
    const imgSize = {
      width: 48,
      height: 48,
      ...imageSize
    }
    dragSize = {
      width: 120,
      height: 120,
      ...dragSize
    }

    var img = document.createElement('img');
    img.setAttribute('src', image);
    img.style.width = `${imgSize.width}px`;
    img.style.height = `${imgSize.height}px`;
    img.title = 'Drag this to the diagram to create a new vertex';
    this.sidebarElement.appendChild(img);
    const dragElem = this.createDragElement({size: dragSize, border: dragBorder})
    
    const onDrag = this.createOnDrag(label, props)

    // Creates the image which is used as the drag icon (preview)
    var ds = mxUtils.makeDraggable(img, graph, onDrag, dragElem, 0, 0, true, true);
    ds.setGuidesEnabled(true);
  } 

  createDragElement({size, border} : {size: ISize, border?: string}): any {
    size = size || {}
    border = border || 'dashed black 1px'
    var dragElem = document.createElement('div');
    dragElem.style.border = border;
    dragElem.style.width = `${size.width}px`;
    dragElem.style.height = `${size.height}px`;
    return dragElem
  }

  
  set dragElement(element: Element) {
    this._dragElt = element
  }

  get dragElement() {
    this._dragElt = this._dragElt || defaultDragElement()
    return this._dragElt
  }

  defaultDragElement() {
    return defaultDragElement()
  }
}
