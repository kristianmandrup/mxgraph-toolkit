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
  createVertex(graph: any, labelOrHtml: string, pos: IPosition, size?: ISize)
}

export const defaultDragElement = () => {
  const dragElt = document.createElement('div');
  dragElt.style.border = 'dashed black 1px';
  dragElt.style.width = '120px';
  dragElt.style.height = '120px';
  return dragElt
}

const imageIconMap = {
  mail: {
    imagePath: 'images/icons48/mail_new.png'
  }
}

export const defaults = {
  imageIconMap
}

export class Sidebar {
  editor: any
  sidebarElement: any
  _dragElt: Element = defaultDragElement()
  imageIconMap: {
    [key:string]: any
  } = defaults.imageIconMap
  defaults = {
    icon: {
      size: {
        width: 48,
        height: 48
      }
    }
  }

  constructor(editor: any, sidebarElement: any) {
    this.editor = editor
    this.sidebarElement = sidebarElement
  }

  get graph() {
    return this.editor.graph
  }

  get defaultParent() {
    return this.graph.getDefaultParent();
  }

  get vertex() {
    return this.graph.vertex
  }

  get builder() {
    return this.vertex.builder
  }

  get ports() {
    return this.vertex.ports
  }

  labelOrHtmlFor(name: string) {
    return this.headerFor(name) + this.imageFor(name)    
  }

  // TODO: externalise in SideIcon class
  headerFor(name: string) {
    return `<h1 style="margin:0px;"><${name}/h1><br>`  
  }

  imageFor(name: string) {
    const { imagePath, size } = this.imagePropsFor(name)
    const { width, height } = size
    return `<img src="${imagePath}" width="48" height="48">`
  }

  imagePropsFor(name) {
    return {
      ...this.defaults.icon,
      ...this.imageIconMap[name]
    }
  }

  // use builder
  addPortsToVertex(vertex, ports) {
    // Adds the ports at various relative locations
    // var port = graph.insertVertex(v1, null, 'Trigger', 0, 0.25, 16, 16,
    //     'port;image=editors/images/overlays/flash.png;align=right;imageAlign=right;spacingRight=18', true);
    // port.geometry.offset = new mxPoint(-6, -8);
  }

  enrichVertex(vertex, props) {
    this.addPortsToVertex(vertex, props.ports)
  }

  // TODO: use Builder
  createIconVertex(labelOrHtml: string, { pos, size, bounds }) {
    const vertex = this.builder.draw.insertVertex(
      this.defaultParent(), 
      labelOrHtml, 
      pos, 
      size, 
      { connectable: false }
    )
    return this.builder.bounds(vertex).setAltBounds(bounds).vertex
  }

  createOnDrag = (labelOrHtml: string, props: any = {}) => (graph, evt, cell, x, y) => {  
    const { size, bounds } = props
    const pos = {x, y}
    var model = graph.getModel();
    const vertex = this.createIconVertex(labelOrHtml, {pos, size, bounds})    

    model.beginUpdate();
    try {                      
      this.enrichVertex(vertex, props)
    } finally {
      model.endUpdate();
    }
    
    graph.setSelectionCell(vertex);
  }  

  // from ports.html
  addSidebarIcon(graph, labelOrHtml: string, image, props: IaddSidebarIcon) {
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
    
    const onDrag = this.createOnDrag(labelOrHtml, props)

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
