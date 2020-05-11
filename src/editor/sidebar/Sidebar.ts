import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxRectangle, mxPoint, mxUtils } = mx

const createPort = (graph, vertex, label, pos, size, imagePath, style, offset) => {
  // Adds the ports at various relative locations
  const port = graph.insertVertex(vertex, null, label, pos.x, pos.y, size.width, size.height,
      `port;image=${imagePath};` + style, true);
  port.geometry.offset = new mxPoint(offset.x, offset.y);
  return port
}

// sample: createPorts
export const createPorts = (graph, v1) => {
    // Adds the ports at various relative locations
    createPort(graph, v1, 'Trigger', {x: 0, y: 0.25}, {width: 16, height: 16},
        'editors/images/overlays/flash.png', 'align=right;imageAlign=right;spacingRight=18;', {x: -6, y: -8})
}

// sample: createVertex
export const createVertex = (graph, label, pos, size: any = {}) => {
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

const createOnDrag = (label, {createPorts, createVertex, vertexSize}: any = {}) => (graph, evt, cell, x, y) => {
  
  var model = graph.getModel();
  
  const v1 = createVertex(graph, label, {x, y, size: vertexSize});
  
  model.beginUpdate();
  try {
              
    createPorts(graph, v1)
  }
  finally {
    model.endUpdate();
  }
  
  graph.setSelectionCell(v1);
}

export interface IaddSidebarIcon {
  dragSize?: ISize,
  imageSize?: ISize,
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

  addSidebarIcon(graph, label: string, image, props: IaddSidebarIcon) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.    
    // Creates the image which is used as the sidebar icon (drag source)
    let { imageSize, dragSize } = props
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
    
    var dragElem = document.createElement('div');
    dragElem.style.border = 'dashed black 1px';
    dragElem.style.width = `${dragSize.width}px`;
    dragElem.style.height = `${dragSize.height}px`;
    
    const onDrag = createOnDrag(label, props)

    // Creates the image which is used as the drag icon (preview)
    var ds = mxUtils.makeDraggable(img, graph, onDrag, dragElem, 0, 0, true, true);
    ds.setGuidesEnabled(true);
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
