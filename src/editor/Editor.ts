import mx from "mx";
import { Graph } from "graph";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
const { mxEditor } = mx

const getElem = (id) => document.getElementById(id)

export const classMap = {
  animate: Animation,
  graph: Graph,
  toolbar: Toolbar,
  sidebar: Sidebar
}

export const defaults = {
  classMap
}

export class Editor {
  editor: any
  containers: any
  _graph: any
  _toolbar: any
  _sidebar: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, { classMap }: any = {}) {
    const editor = new mxEditor();
    this.editor = editor
    this.editor.graph = graph
    this.setClassMap(classMap)
  }
  
  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  init() {
    this.setContainerMap()
    return this
  }

  get defaultContainerMap(): any {
    return {
      graph: getElem('graphContainer'),
      outline: getElem('outlineContainer'),
      toolbar: getElem('toolbarContainer'),
      sidebar: getElem('sidebarContainer'),
      status: getElem('statusContainer')
    }        
  }

  setContainerMap(containers: any = {}) {
    this.containers = {
      ...this.defaultContainerMap,
      containers
    }
    return this
  }

  get $graph(): any {
    return this.editor.graph;
  }

  get graph() {
    this._graph = this._graph || this.createGraph()
    return this._graph
  }
  
  setGraph(graph?: any) {
    this._graph = graph || this.createGraph()
    return this._graph
  }
  
  protected createGraph(): any {
    return new this.classMap.graph(this.$graph, {editor: this})
  }  
  
  get toolbar() {
    this._toolbar = this._toolbar || this.createToolbar()
    return this._toolbar
  }
  
  setToolbar(toolbar?: any) {
    this._toolbar = toolbar || this.createToolbar()
    return this._toolbar
  }
  
  protected createToolbar(): any {
    return new this.classMap.toolbar(this.graph)
  }  
  
  get sidebar() {
    this._sidebar = this._sidebar || this.createSidebar()
    return this._sidebar
  }
  
  setSidebar(sidebar?: any) {
    this._sidebar = sidebar || this.createSidebar()
    return this._sidebar
  }
  
  protected createSidebar(): any {
    return new this.classMap.sidebar(this.graph)
  }  

  setDefaultGroup(group) {
    this.editor.defaultGroup = group
    return this
  }

  configure(config: any) {
    this.editor.configure(config)
    return this
  }
}
