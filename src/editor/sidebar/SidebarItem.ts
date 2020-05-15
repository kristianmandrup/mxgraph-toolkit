import { createStyledElement } from "utils";
import { IPosition, ISize } from 'types';

export class SidebarItem {
  defaults = {
    drag: {
      size: {
        width: 120,
        height: 120
      },
      style: {
        border: 'dashed black 1px'
      }
    }
  }

  _dragElt: Element = this.defaultDragElement()  
  sidebar: any
  graph: any

  constructor(graph: any, sidebar: any) {
    this.sidebar = sidebar
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

  get defaultParent() {
    return this.graph.getDefaultParent();
  }

  defaultDragElement () {
    const { size, style } = this.defaults.drag
    const { width, height } = size
    const dragElt = createStyledElement({
      border: 'dashed black 1px',
      width: `${width}px`,
      height: `${height}px`,
      ...style
    },'div');
    
    return dragElt
  }
  
  // Override to provide custom label/display such as using: 
  // HtmlLabel or LabelImage
  labelOrHtmlFor(name: string) {
    return name
  }

  // use builer to f.ex add ports
  enrichVertex(vertex, props) {
    return vertex
  }

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
    this._dragElt = this._dragElt || this.defaultDragElement()
    return this._dragElt
  }  
}