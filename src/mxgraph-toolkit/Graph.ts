import mx from "./mx";
import { DrawLayer } from './Layers';
import { StyleSheet } from './Stylesheet';
import { VertexToolHandler } from './VertexToolHandler';
import { Permission } from './Permission';
import { Editing } from './Editing';
import { Guides } from './Guides';
import { Group } from './Group';
const { mxEdgeHandler, mxGraphHandler, mxMorphing, mxEvent, 
  mxCellState, mxRubberband, mxKeyHandler, mxGraphModel, mxGraph } = mx

type IsCellVisibleFn = (cell: any) => boolean

export interface IGraph {
  graph: any
  model: any
}

export type DOMPosition = {
  left: number
  top: number
}

export class Graph {
  graph: any
  editor: any
  _rubberband: any
  _keyHandler: any
  currentPermission: Permission
  _editing: any
  _guides: any

  constructor(graph: any, { editor, currentPermission }: any = {}) {
    this.graph = graph
    this.editor = editor
    this.currentPermission = currentPermission || {}
  }
  
  static createGraphWithModel(container: Element, model?: any) {
    model = model || new mxGraphModel();
    return new mxGraph(container, model);
  }

  static createGraphDOMElement({pos, background}: {pos?: DOMPosition, background?: string} = {}): Element {
    let { left, top} = pos || {}
    left = left || 24
    top = top || 26
    background = background || 'url("images/grid.gif")'
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
    container.style.right = '0px';
    container.style.bottom = '0px';
    container.style.background = background
    return container
  }
  
  get editing() {
    return this._editing
  }

  setEditing(editing?: any) {
    this._editing = editing || this.createEditing(this.graph)
    return this._editing
  }

  protected createEditing(props) {
    new Editing(this.graph, props)
  }
  
  get guides() {
    return this._guides
  }

  createGroup(name: string = 'Group', label: string = 'group') {
    return new Group(name, label)
  }

  setGuides(guides?: any) {
    this._guides = guides || this.createGuides()
    return this._guides
  }

  protected createGuides(): any {
    return new Guides()
  }

  get model() {
    return this.graph.model
  }

  getModel() {
    return this.graph.getModel()
  }

  setDropEnabled(value: boolean) {
    this.graph.setDropEnabled(value)
  }

  setSplitEnabled(value: boolean) {
    this.graph.setSplitEnabled(value)
  }

  setResizeContainerEnabled(value: boolean) {
    this.graph.setResizeContainer(value)
  }

  setIsCellVisible(isCellVisible: IsCellVisibleFn) {
    const { graph } = this
    graph.isCellVisible = isCellVisible
  }

  setAllowLoops(value: boolean) {
    this.graph.setAllowLoops(value);
  }
    
  setFoldingEnabled(value: boolean) {
    this.graph.foldingEnabled = value;
  }

  setRecursiveResizeEnabled(value: boolean) {
    this.graph.recursiveResize = value;
  }

  setCellsDisconnectable(value: boolean) {
    this.graph.setCellsDisconnectable(value);
  }

  setAllowDanglingEdges(value: boolean) {
    this.graph.setAllowDanglingEdges(value);
  }

  setCellsEditable(value: boolean) {
    this.graph.setCellsEditable(value);
  }
  
  setCenterZoom(value: boolean) {
    this.graph.centerZoom = value;
  }

  get draw(): DrawLayer {
    return this.createDrawLayer()
  }

  protected createDrawLayer() {
    return new DrawLayer(this, this.defaultParent)
  }
  
  setGuidesEnabled(value: boolean) {
    mxGraphHandler.prototype.guidesEnabled = true;
  }
  
  setSnapToTerminals(value: boolean) {
    mxEdgeHandler.prototype.snapToTerminals = value;
  }
  
  // Disables automatic handling of ports. This disables the reset of the
  // respective style in mxGraph.cellConnected. Note that this feature may
  // be useful if floating and fixed connections are combined.
  disableAutoPorts() {
    this.setPortsEnabled(false);
  }

  setPortsEnabled(value: boolean) {
    this.graph.setPortsEnabled(value);
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

  updateTransaction(fn) {
    this.model.beginUpdate()
    fn(this)
    this.model.endUpdate()
  }

  get defaultParent() {
    return this.graph.getDefaultParent();
  }

  addCellOverlay(cell, overlay) {
    this.graph.addCellOverlay(cell, overlay)
  };

  stopEditing(value: boolean) {
    this.graph.stopEditing(value);
  }
  
  hidePopupMenu() {
    this.graph.popupMenuHandler.hideMenu();
  }

  disableFolding() {
    this.graph.isCellFoldable = (cell) => false
  }

  enablePorts() {
    this.graph.isPort = createIsPort(this.graph)
  }

  setTooltips(value: boolean) {
    this.graph.setTooltips(value);
  }

  setGetToolTipFn(getTooltipFn: (state) => any) {
    const { graph } = this
    this.graph.getTooltip = getTooltipFn.bind(graph)
  }

  setGetLabelFn(getLabelFn: (cell) => any) {
    const { graph } = this
    this.graph.getLabel = getLabelFn.bind(graph)
  }

  get stylesheet() {
    return this.graph.getStylesheet()
  }

  withStylesheet() {
    return new StyleSheet(this.stylesheet)
  }

  enableConnectPreview() {
    this.graph.connectionHandler.createEdgeState = (me) => {
      var edge = this.graph.createEdge(null, null, null, null, null);      
      return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    };
  }

  createVertexHandler(...args) {
    this.graph.createHandler = (state) => {
      if (state != null && this.model.isVertex(state.cell)) {
        return new VertexToolHandler(this.graph, state);
      }

      return mxGraph.prototype.createHandler(state);
    }
  };  

  setHtmlLabels(value: boolean) {
    this.graph.setHtmlLabels(value);  
  }
  

  setPanning(value: boolean) {
    this.graph.setPanning(value)
  }

  setEnabled(value: boolean) {
    this.graph.setEnabled(value);
  }

  setConnectable(value: boolean) {
    this.graph.setConnectable(value);
  }
  
  setMultigraph(value: boolean) {
    this.graph.setMultigraph(value);
  }
  
  get rubberband() {
    this._rubberband = this._rubberband || new mxRubberband(this.graph)
    return this._rubberband
  }

  get keyHandler() {
    this._keyHandler = this._keyHandler || new mxKeyHandler(this.graph);
    return this._keyHandler      
  }
}
