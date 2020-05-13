import mx from "mx";
import { IPosition, ISize } from 'types';
import { createStyledElement } from "utils";
const { mxRectangle, mxPoint, mxUtils } = mx

export interface IaddSidebarIcon {
  title?: string
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

  addPortsToVertex(vertex, ports) {
  }

  enrichVertex(vertex, props) {
    this.addPortsToVertex(vertex, props.ports)
  }

  // use a VertexBuilder
  createVertex(label, {pos, size, bounds}) {
  }

  createOnDrag = (label, props: any = {}) => (graph, evt, cell, x, y) => {  
    const { size, bounds } = props
    const pos = {x, y}
    var model = graph.getModel();
    const vertex = this.createVertex(label, {pos, size, bounds})    

    model.beginUpdate();
    try {                      
      this.enrichVertex(vertex, props)
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
    let { imageSize, dragSize, dragBorder, title } = props
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
    const img = this.createImageIcon(image, imgSize, title)

    this.sidebarElement.appendChild(img);
    const dragElem = this.createDragElement({size: dragSize, border: dragBorder})
    
    const onDrag = this.createOnDrag(label, props)

    // Creates the image which is used as the drag icon (preview)
    var ds = mxUtils.makeDraggable(img, graph, onDrag, dragElem, 0, 0, true, true);
    ds.setGuidesEnabled(true);
  } 

  createImageIcon(image, size, title) {
    const { width, height } = size
    const img = createStyledElement({
      width: `${width}px`,
      height: `${height}px`
    }, 'img');
    img.setAttribute('src', image);
    img.title = title || 'Drag this to the diagram to create a new vertex';  
    return img
  }

  createDragElement({size, border} : {size: ISize, border?: string}): any {
    const { width, height } = size
    border = border || 'dashed black 1px'
    return createStyledElement({
      border,
      width: `${width}px`,
      height: `${height}px`
    }, 'div');
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
