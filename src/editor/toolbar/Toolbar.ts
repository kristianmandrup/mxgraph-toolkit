import mx from "mx";
import { ToolbarItem } from './ToolbarItem';
import { ElementPos } from "editor/types";
import { setStyle, createStyledElement } from "utils";
const { mxGeometry, mxCell, mxToolbar } = mx

export class Toolbar {
  graph: any
  toolbar: any
  _toolbarItem: any
  toolbarItems: any = {}
  defaults: any = {
    toolbarElement: {
      position: {width: 24, top: 26, left: 0, bottom: 0},
      style: { padding: 2}    
    },

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
  
  createToolbarForElement = (container: Element) => {
    const toolbar: any = new mxToolbar(container || this.createToolbarElement());
    toolbar.enabled = false  
    return toolbar
  }  

  setToolbar(toolbar: any) {
    if (!toolbar) {
      toolbar = this.createToolbarElement()
    }
    this.toolbar = toolbar
  }

  setToolbarForElement(container: Element) {
    const toolbar = this.createToolbarForElement(container)
    this.setToolbar(toolbar)
    return this
  }
  
  addVertex(name: string, icon: any, w: number, h: number, style: any) {
    const geometry = new mxGeometry(0, 0, w, h)
    var vertex = new mxCell(null, geometry, style);
    vertex.setVertex(true);
    this.addToolbarItem(name, vertex, icon);
    return this
  }

  getToolbarItem(name: string): any {
    return this.toolbarItems[name]
  }

  get toolbarItem(): any {
    this._toolbarItem = this._toolbarItem || new ToolbarItem(this.graph, this.toolbar)
    return this._toolbarItem
  }
  
  addToolbarItem(name: string, cellPrototype: any, image: any): any {    
    const { toolbarItem } = this
    if (cellPrototype && image) {
      toolbarItem.add(cellPrototype, image)
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
