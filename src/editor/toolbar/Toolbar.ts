import mx from "mx";
import { ToolbarItem } from './ToolbarItem';
const { mxGeometry, mxCell, mxToolbar } = mx

type ToolbarPosition = {
  top: number
  width: number,
  padding: number
}

export class Toolbar {
  graph: any
  toolbar: any
  toolbarItems: any = {}

  constructor(graph: any, toolbar?: any) {  
    this.graph = graph
    this.setToolbar(toolbar)
  }

  static create(graph: any, tbContainer: Element) {
    return new Toolbar(graph).setToolbarForElement(tbContainer)
  }
  
  createToolbarDOMElement(props: ToolbarPosition = {width: 24, top: 26, padding: 2}): Element {
    let {top, width, padding} = props
    width = width || 24
    top = top || 26  
    padding = padding || 2
    // Creates the div for the toolbar
    var tbContainer = document.createElement('div');
    tbContainer.style.position = 'absolute';
    tbContainer.style.overflow = 'hidden';
    tbContainer.style.padding = `${padding}px`;
    tbContainer.style.left = '0px';
    tbContainer.style.top = `${top}px`;
    tbContainer.style.width = `${width}`;
    tbContainer.style.bottom = '0px';    
    return tbContainer
  }
  
  static createToolbarForElement = (tbContainer: Element) => {
    const toolbar: any = new mxToolbar(tbContainer);
    toolbar.enabled = false  
    return toolbar
  }  

  setToolbar(toolbar: any) {
    if (!toolbar) {
      toolbar = this.createToolbarDOMElement()
    }
    this.toolbar = toolbar
  }

  setToolbarForElement(tbContainer: Element) {
    const toolbar = Toolbar.createToolbarForElement(tbContainer)
    this.setToolbar(toolbar)
    return this
  }
  
  addVertex(name: string, icon: any, w: number, h: number, style: any) {
    const geometry = new mxGeometry(0, 0, w, h)
    var vertex = new mxCell(null, geometry, style);
    vertex.setVertex(true);
    this.addToolbarItem(name, vertex, icon);
  }

  getToolbarItem(name: string): any {
    return this.toolbarItems[name]
  }
  
  addToolbarItem(name: string, cellPrototype: any, image: any) {
    const toolbarItem = new ToolbarItem(this.graph, this.toolbar)
    this.toolbarItems[name] = toolbarItem
    if (cellPrototype && image) {
      toolbarItem.add(cellPrototype, image)
    }    
  }
}
