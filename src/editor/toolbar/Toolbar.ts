import mx from "mx";
import { ToolbarItems } from './ToolbarItems';
import { ElementPos } from "editor/types";
import { createStyledElement } from "utils";
import { IPosition, ISize } from "types";
const { mxGeometry, mxCell, mxToolbar } = mx

type AddVertexOpts= {pos?: IPosition, size?: ISize, style?: string}

export class Toolbar {
  graph: any
  toolbar: any
  _toolbarItem: any
  toolbarItems: any = {}
  defaults: any = {
    toolbarElement: {
      position: {width: 24, top: 26, left: 0, bottom: 0},
      style: { padding: 2}    
    }
  }

  constructor(graph: any, toolbar?: any) {  
    this.graph = graph
    this.setToolbar(toolbar)
  }

  static create(graph: any, tbContainer: Element) {
    return new Toolbar(graph).setToolbarForElement(tbContainer)
  }
  
  createToolbarElement(props: ElementPos = {}, style: any = {}): Element {
    const { defaults } = this
    const { toolbarElement } = defaults
    props = {
      ...toolbarElement.position,
      ...props || {}
    }
    style = {
      ...toolbarElement.style,
      ...style || {}
    }
    let { left, top, bottom, width } = props
    let { padding } = style
    // Creates the div for the toolbar
    return createStyledElement({
      position: 'absolute',
      overflow: 'hidden',
      padding: `${padding}px`,
      left :`${left}px`,
      top: `${top}px`,
      width :`${width}`,
      bottom: `${bottom}px`
    })    
  }

  enable() {
    this.toolbar.enable = true
    return this
  }

  disable() {
    this.toolbar.enable = false
    return this
  }


  createToolbarForElement = (container?: Element) => {
    return new mxToolbar(container || this.createToolbarElement());
  }  

  setToolbar(toolbar: any) {
    if (!toolbar) {
      toolbar = this.createToolbarElement()
    }
    this.toolbar = toolbar
  }

  setToolbarForElement(container?: Element) {
    const toolbar = this.createToolbarForElement(container)
    this.setToolbar(toolbar)
    return this
  }
  
  addVertex(name: string, iconImage, { pos, size, style}: AddVertexOpts = {}) {
    pos = {
      x: 0,
      y: 0,
      ...pos || {}
    }
    size = {
      width: 16,
      height: 16,
      ...size || {}
    }

    const { width, height } = size
    const geometry = new mxGeometry(0, 0, width, height)
    var vertex = new mxCell(null, geometry, style)
    vertex.setVertex(true);
    this.addToolbarItem(vertex, iconImage)
    return this
  }

  protected get toolbarItem(): any {
    this._toolbarItem = this._toolbarItem || new ToolbarItems(this.graph, this.toolbar)
    return this._toolbarItem
  }
  
  addToolbarItem(cellPrototype: any, iconImage: any): any {    
    const { toolbarItem } = this
    if (cellPrototype && iconImage) {
      toolbarItem.add(cellPrototype, iconImage)
    }    
    return this
  }

  addToolbarItems(itemMap: any) {
    this.toolbarItem.addMap(itemMap)
    return this
  }

  addToolbarButtons(itemMap: any) {
    this.toolbarItem.addToolbarButtons(itemMap)
    return this
  }
}
