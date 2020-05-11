import mx from "mx";
import { Graph } from "graph";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import { Statusbar } from "./statusbar";
import { OutlineMap } from "./outlineMap";
import { FileIO } from "io";
const { mxEditor } = mx

const getElem = (id) => document.getElementById(id)

export const classMap = {
  io: FileIO,
  animate: Animation,
  graph: Graph,
  toolbar: Toolbar,
  sidebar: Sidebar,
  statusbar: Statusbar,
  outlineMap: OutlineMap,
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
  _outlineMap: any
  _io: any

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

  get outlineMap(): any {
    this._outlineMap = this._outlineMap || this.createOutlineMap()
    return this._outlineMap
  }
  
  setOutlineMap(outlineMap?: any, outlineElement?: any) {    
    this._outlineMap = outlineMap || this.createOutlineMap(outlineElement)
    return this._outlineMap
  }
  
  protected createOutlineMap(outlineElement?: any) {
    outlineElement = outlineElement || this.containers.outline
    return new this.classMap.outlineMap(this.graph, outlineElement)
  }  

  get graph() {
    this._graph = this._graph || this.createGraph()
    return this._graph
  }
  
  setGraph(graph?: any, props: any = {}) {
    this._graph = graph || this.createGraph(props)
    return this._graph
  }
  
  protected createGraph(props: any = {}): any {
    return new this.classMap.graph(this.$graph, {editor: this, ...props})
  }  
  
  get io() {
    this._io = this._io || this.createIO()
    return this._io
  }
  
  setIO(io?: any) {
    this._io = io || this.createIO()
    return this._io
  }
  
  protected createIO(): any {
    return new this.classMap.io(this.graph)
  }

  get toolbar() {
    this._toolbar = this._toolbar || this.createToolbar()
    return this._toolbar
  }
  
  setToolbar(toolbar?: any, toolbarElement?: any) {
    toolbarElement = toolbarElement || this.containers.toolbar
    this._toolbar = toolbar || this.createToolbar(toolbarElement)
    return this._toolbar
  }
  
  protected createToolbar(toolbarElement?: any): any {
    return new this.classMap.toolbar(this.graph, toolbarElement)
  }  
  
  get sidebar() {
    this._sidebar = this._sidebar || this.createSidebar()
    return this._sidebar
  }
  
  setSidebar(sidebar?: any, sidebarElement?: Element) {
    sidebarElement = sidebarElement || this.containers.sidebar
    this._sidebar = sidebar || this.createSidebar(sidebarElement)
    return this._sidebar
  }
  
  protected createSidebar(sidebarElement?: Element): any {
    return new this.classMap.sidebar(this.graph, sidebarElement)
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
