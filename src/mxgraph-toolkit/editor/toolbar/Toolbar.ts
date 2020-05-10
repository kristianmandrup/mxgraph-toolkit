import mx from "@toolkit/mx";
import { ToolbarItem } from './ToolbarItem';
const { mxGeometry, mxCell, mxToolbar } = mx

type IaddToolbarItemFn = (graph: any, toolbar: any, cellPrototype: any, image: any) => void

export class Toolbar {
  graph: any
  toolbar: any
  addToolbarItem: IaddToolbarItemFn | undefined

  constructor(graph: any, toolbar?: any) {  
    this.graph = graph
    this.setToolbar(toolbar)
  }

  setToolbar(toolbar: any) {
    if (!toolbar) return
    this.toolbar = toolbar
    this.addToolbarItem = createAddToolbarItem(this.graph, toolbar)  
  }


  static create(graph: any, tbContainer: Element) {
    return new Toolbar(graph).setToolbarForElement(tbContainer)
  }
  
  static createToolbarDOMElement({top, width}: {top: number, width: number} = {width: 24, top: 26}): Element {
    width = width || 24
    top = top || 26  
    // Creates the div for the toolbar
    var tbContainer = document.createElement('div');
    tbContainer.style.position = 'absolute';
    tbContainer.style.overflow = 'hidden';
    tbContainer.style.padding = '2px';
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

  setToolbarForElement(tbContainer: Element) {
    const toolbar = Toolbar.createToolbarForElement(tbContainer)
    this.setToolbar(toolbar)
    return this
  }
  
  addVertex(icon: any, w: number, h: number, style: any, addToolbarItem?: IaddToolbarItemFn) {
    const { graph, toolbar } = this
    const geometry = new mxGeometry(0, 0, w, h)
    var vertex = new mxCell(null, geometry, style);
    vertex.setVertex(true);
    addToolbarItem = addToolbarItem || this.addToolbarItem  
    if (!addToolbarItem) return
    addToolbarItem(graph, toolbar, vertex, icon);
  };  
}

export const createAddToolbarItem = (graph: any, toolbar: any) => (cellPrototype: any, image: any) => {
  const toolbarItem = new ToolbarItem(graph, toolbar)
  toolbarItem.add(cellPrototype, image)
}

export const addToolbarItem = (graph: any, toolbar: any, cellPrototype: any, image: any) => {
  const toolbarItem = new ToolbarItem(graph, toolbar)
  toolbarItem.add(cellPrototype, image)
}

