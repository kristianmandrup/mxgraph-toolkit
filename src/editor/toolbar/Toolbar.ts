import mx from "mx";
import { ToolbarItems } from './ToolbarItems';
import { ElementPos } from "editor/types";
import { createStyledElement } from "utils";
import { IPosition, ISize } from "types";
import { ToolbarButtons } from "./ToolbarButtons";
const { mxGeometry, mxCell, mxToolbar } = mx

type AddVertexOpts= {pos?: IPosition, size?: ISize, style?: string}

export const defaults= {
  classMap: {
    items: ToolbarItems,
    buttons: ToolbarButtons
  }  
}


export class Toolbar {
  graph: any
  toolbar: any
  editor: any

  _toolbarItems: any
  _toolbarButtons: any

  defaults: any = {
    toolbarElement: {
      position: {width: 24, top: 26, left: 0, bottom: 0},
      style: { padding: 2}    
    },
  }

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, {editor, toolbar, classMap}: any = {}) {  
    this.graph = graph
    this.editor = editor
    this.setToolbar(toolbar)
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
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
  
  protected get items(): any {
    this._toolbarItems = this._toolbarItems || this.createToolbarItems()
    return this._toolbarItems
  }

  createToolbarItems() {
    return new this.classMap.items(this.graph, this.toolbar)
  }

  protected get buttons(): any {
    this._toolbarButtons = this._toolbarButtons || this.createToolbarButtons()
    return this._toolbarButtons
  }

  createToolbarButtons() {
    return this.classMap.buttons(this.graph, this.toolbar)
  }
  
  execute(action) {
    this.editor.execute(action)
  }    
}
