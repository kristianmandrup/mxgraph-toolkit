import mx from "mx";
import { Actions } from "./actions";
import { Cell } from './cell';
import { Drop } from "./drop";
import { Layers } from './layers';
import { Edge } from './edge';
import { GraphToggler } from './GraphToggler';
import { StyleSheet } from './style';
import { Vertex } from './vertex';
import { Validation } from './validation'
import { Permission } from './permission';
import { UserObject } from "./data";
import { Layout } from "./layout";
import { Monitor } from "./monitor";
import { Scrollable } from "./scrollable";
import { ModalWindow, Window } from "./window";
import { createStyledElement } from "utils";
import * as shapes from './shapes';
export { shapes }

export const shapesMap = {
  box: shapes.BoxShape,
  connector: shapes.ConnectorShape,
  link: shapes.LinkShape,
  message: shapes.MessageShape
}

const { 
  mxMorphing, mxEvent, 
  mxCellState, mxRubberband, mxKeyHandler, 
  mxGraphModel, mxGraph 
} = mx

type IsCellVisibleFn = (cell: any) => boolean

export * as actions from './actions';
export * as cell from './cell';
export * as data from './data';
export * as drop from './drop';
export * as edge from './edge';
export * as layers from './layers';
export * as layout from './layout';
export * as monitor from './monitor';
export * as permission from './permission';
export * as scroll from './scrollable';
export * as selection from './selection';

export * as style from './style';
export * as swimlanes from './swimlanes';
export * as vertex from './vertex';
export * as window from './window';

export interface IGraph {
  graph: any
  model: any
}

export type DOMPosition = {
  left?: number,
  right?: number
  top?: number,
  bottom?: number,
}

export const classMap = {
  actions: Actions,
  cell: Cell,
  data: UserObject,
  drop: Drop,
  edge: Edge,
  layers: Layers,
  layout: Layout,  
  monitor: Monitor,
  permission: Permission,
  scrollable: Scrollable,
  graphToggler: GraphToggler,  
  styleSheet: StyleSheet,
  validation: Validation,
  vertex: Vertex, 
  modalWindow: ModalWindow,
  window: Window,
}

export const defaults = {
  classMap,
  shapesMap
}

export class Graph {
  graph: any
  editor: any

  // mxGraph
  _rubberband: any
  _keyHandler: any

  // toolkit wrappers
  _actions: any
  _cell: any
  _data: any
  _drop: any
  _edge: any
  _layers: any
  _layout: any  
  _monitor: any
  _permission: any
  _scroll: any
  _selection: any
  _shapes: any
  _style: any
  _defaultStyles: any
  _wstylesheet: any
  _toggler: any
  _validation
  _vertex: any
  _window: any
  _modalWindow: any
  
  shapesMap: {
    [key: string]: any
  } = defaults.shapesMap

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, props: any = {}) {
    const { editor, classMap } = props
    this.graph = graph
    this.editor = editor
    this.setClassMap(classMap)
  }

  setShapesMap(shapesMap) {
    this.shapesMap = shapesMap || defaults.shapesMap
  }

  shape(name: string) {
    return this.shapesMap[name]
  }

  get permission() {
    this._permission = this._permission || this.createPermission()
    return this._permission
  }

  setPermission(permission?: any, props?: any) {
    this._permission = permission || this.createPermission(props)
    return this
  }

  createPermission(props?: any): any {
    return new this.classMap.permission(this.graph, props);
  }  

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  static createGraphWithModel(container: Element, model?: any) {
    model = model || new mxGraphModel();
    return new mxGraph(container, model);
  }

  static createGraphDOMElement({pos, background}: {pos?: DOMPosition, background?: string} = {}): Element {
    let { left, top, right, bottom } = pos || {}
    left = left || 24
    top = top || 26
    background = background || 'url("images/grid.gif")'
    return createStyledElement({
      position: 'absolute',
      overflow: 'hidden',
      left: `${left}px`,
      top: `${top}px`,
      right: `${right}px`,
      bottom: `${bottom}px`,
      background: background
  
    }, 'div');
  }

  get defaultParent() {
    return this.graph.getDefaultParent();
  }
  
  get stylesheet() {
    return this.graph.getStylesheet()
  }

  get rubberband() {
    this._rubberband = this._rubberband || this.createRubberband()
    return this._rubberband
  }

  createRubberband(): any {
    return new mxRubberband(this.graph)
  }

  get keyHandler() {
    this._keyHandler = this._keyHandler || this.createKeyHandler()
    return this._keyHandler      
  }

  createKeyHandler(): any {
    return new mxKeyHandler(this.graph);
  }

  switch(nameMap: any) {
    this.toggle.switch(nameMap)
  }

  on(names: string[]) {
    this.toggle.on(names)
  }

  off(names: string[]) {  
    this.toggle.off(names)
  }

  get toggle(): any {
    this._toggler = this._toggler || this.createToggler()
    return this._toggler
  }

  setToggler(toggler?: any, props?: any) {
    this._toggler = toggler || this.createToggler(props)
    return this
  }

  createToggler(props?: any): any {
    return new this.classMap.graphToggler(this.graph, props);
  }

  setGridSize(size: number) {
    this.graph.gridSize = size
    return this
  }
    
  get drop() {
    this._drop = this._drop || this.createDrop()
    return this._drop
  }
  
  setDrop(drop?: any) {
    this._drop = drop || this.createDrop()
    return this._drop
  }
  
  protected createDrop(): any {
    return new this.classMap.drop(this.graph)
  }  

  get data() {
    this._data = this._data || this.createData()
    return this._data
  }
  
  setData(data?: any) {
    this._data = data || this.createData()
    return this._data
  }
  
  protected createData(): any {
    return new this.classMap.data(this.graph)
  }  
    
  get layers() {
    this._layers = this._layers || this.createLayers()
    return this._layers
  }
  
  setLayers(layers?: any) {
    this._layers = layers || this.createLayers()
    return this._layers
  }
  
  protected createLayers() {
    return new this.classMap.layers(this.graph)
  }
  
  get layout() {
    this._layout = this._layout || this.createLayout()
    return this._layout
  }
  
  setLayout(layout?: any) {
    this._layout = layout || this.createLayout()
    return this._layout
  }
  
  protected createLayout() {
    return new this.classMap.layout(this.graph)
  }
  
  get style() {
    this._style = this._style || this.createStyle()
    return this._style
  }

  setStyle(style?: any) {
    this._style = style || this.createStyle()
    return this
  }

  createStyle(): any {
    return new this.classMap.style(this.graph);
  }

  get defaultStyles() {
    this._defaultStyles = this._defaultStyles || this.createDefaultStyles()
    return this._defaultStyles
  }

  setDefaultStyles(defaultStyles?: any) {
    this._defaultStyles = defaultStyles ||  this.createDefaultStyles()
    return this
  }

  createDefaultStyles(): any {
    return new this.classMap.defaultStyles(this.graph);
  }

  get edge() {
    this._edge = this._edge || this.createEdge()
    return this._edge
  }
  
  setEdge(edge?: any) {
    this._edge = edge || this.createEdge()
    return this._edge
  }
  
  protected createEdge(): any {
    return new this.classMap.edge(this.graph)
  }  

  get cell() {
    this._cell = this._cell || this.createCell()
    return this._cell
  }

  setCell(cell?: any) {
    this._cell = cell || this.createCell()
    return this._cell
  }

  protected createCell(): any {
    return new this.classMap.cell(this.graph)
  }

  get model() {
    return this.graph.model
  }

  getModel() {
    return this.graph.getModel()
  }

  get vertex(): Vertex {
    this._vertex = this._vertex || this.createVertex()
    return this._vertex
  }

  setVertex(vertex?: any) {
    this._vertex = vertex || this.createVertex()
    return this._vertex
  }

  protected createVertex() {
    return new this.classMap.vertex(this.graph)
  }

  get window() {
    this._window = this._window || this.createWindow()
    return this._window
  }

  setWindow(window?: any) {
    this._window = window || this.createWindow()
    return this._window
  }

  protected createWindow() {
    return new this.classMap.window(this.graph)
  }

  get scroll() {
    this._scroll = this._scroll || this.createScroll()
    return this._scroll
  }
  
  setScroll(scroll?: any) {
    this._scroll = scroll || this.createScroll()
    return this._scroll
  }
  
  protected createScroll() {
    return new this.classMap.scroll(this.graph)
  }
  
  get validation() {
    this._validation = this._validation || this.createValidation()
    return this._validation
  }
  
  setValidation(validation?: any) {
    this._validation = validation || this.createValidation()
    return this._validation
  }
  
  protected createValidation() {
    return new this.classMap.validation(this.graph)
  }  

  setIsCellVisible(isCellVisible: IsCellVisibleFn) {
    const { graph } = this
    graph.isCellVisible = isCellVisible
  }

  morph(onDone: () => void) {
    var morph = new mxMorphing(this.graph);
    morph.addListener(mxEvent.DONE, () => {
      if (onDone != null) {
        onDone();
      }
    });
    
    morph.startAnimation();    
  }

  beginUpdate() {
    this.model.beginUpdate()
  }

  endUpdate() {
    this.model.endUpdate()
  }

  modelTransaction(fn) {
    this.model.beginUpdate()
    fn(this)
    this.model.endUpdate()
  }

  hidePopupMenu() {
    this.graph.popupMenuHandler.hideMenu();
  }

  enablePorts() {
    this.graph.isPort = this.cell.createIsPort(this.graph)
  }

  setGetToolTipFn(getTooltipFn: (state: any) => string) {
    const { graph } = this
    this.graph.getTooltip = getTooltipFn.bind(graph)
  }

  withStylesheet(clear: boolean = false): any {
    this._wstylesheet = (!clear && this._wstylesheet) || new StyleSheet(this.stylesheet)
    return this._wstylesheet
  }

  enableConnectPreview() {
    const { graph } = this
    graph.connectionHandler.createEdgeState = (me) => {
      var edge = graph.createEdge(null, null, null, null, null);      
      return new mxCellState(this.graph.view, edge, graph.getCellStyle(edge));
    };
  } 
}
