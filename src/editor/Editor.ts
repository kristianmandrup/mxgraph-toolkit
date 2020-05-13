import mx from "mx";
import { Graph } from "graph";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import { Statusbar } from "./statusbar";
import { OutlineMap } from "./outlineMap";
import { FileIO } from "io";
import { getElem } from "./utils";
import { Actions } from "graph/actions";
const { mxEditor } = mx

export const classMap = {
  io: FileIO,
  animate: Animation,
  graph: Graph,
  toolbar: Toolbar,
  sidebar: Sidebar,
  statusbar: Statusbar,
  outlineMap: OutlineMap,
  actions: Actions
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
  _actions: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  nameMap = {
    graph: 'graphContainer',
    outline: 'outlineContainer',
    toolbar: 'toolbarContainer',
    sidebar: 'sidebarContainer',
    status: 'statusContainer'
  }

  containerMap = {
    graph: this.getC('graph'),
    outline: this.getC('outline'),
    toolbar: this.getC('toolbar'),
    sidebar: this.getC('sidebar'),
    status: this.getC('status')
  } 

  cName(name: string) {
    return `${name}Container`
  }

  getC(name: string) {
    return getElem(this.nameMap[name] || this.cName(name))
  }

  constructor(graph: any, { classMap, containerMap }: any = {}) {
    const editor = new mxEditor();
    this.editor = editor
    this.editor.graph = graph
    this.setClassMap(classMap)
    this.containerMap = {
      ...this.containerMap,
      ...containerMap || {}
    }
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
    return this.containerMap       
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

  get actions(): any {
    this._actions = this._actions || this.createActions()
    return this._actions
  }
  
  setActions(actions?: any, props?: any) {    
    this._actions = actions || this.createActions(props)
    return this._actions
  }
  
  protected createActions(props?: any) {
    return new this.classMap.actions(this.graph, props)
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
