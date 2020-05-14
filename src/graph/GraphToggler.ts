import mx from "mx";
import { createSwitch, Switch } from "./Switch";
import { defaults } from "./defaults";
const { mxEdgeHandler, mxGraphHandler } = mx

export class GraphToggler {
  graph: any
  drop?: Switch
  split?: Switch
  resizeContainer?: Switch
  allowLoops?: Switch
  folding?: Switch

  constructor(graph: any, { nameMap }: any) {
    this.graph = graph
    this.setupSwitches(nameMap)
  }

  setupSwitches(nameMap: any = defaults.nameMap) {
    Object.keys(nameMap).map(name => {
      const methodName = nameMap[name] 
      this[name] = createSwitch(this, name, methodName)
    })
  }

  switch(nameMap: any) {
    Object.keys(nameMap).map(name => {
      nameMap[name] ? this[name].on() : this[name].off() 
    })
  }

  on(names: string[]) {
    names.map(name => this[name].on())
  }

  off(names: string[]) {
    names.map(name => this[name].off())
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

  setGridEnabled(value: boolean) {
    this.graph.gridEnabled = value;
    return this
  }

  setAutoScroll(value: boolean) {
    this.graph.autoScroll = value;
    return this
  }
  
  setGuidesEnabled(value: boolean) {
    mxGraphHandler.prototype.guidesEnabled = true;
  }
  
  setSnapToTerminals(value: boolean) {
    mxEdgeHandler.prototype.snapToTerminals = value;
  }
  
  setPortsEnabled(value: boolean) {
    this.graph.setPortsEnabled(value);
  }

  stopEditing(value: boolean) {
    this.graph.stopEditing(value);
  }

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
  
  setTooltips(value: boolean) {
    this.graph.setTooltips(value);
  }
}

