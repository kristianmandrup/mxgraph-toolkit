import mx from "mx";
import { createStyledElement, setStyle } from "utils";
import { ToolbarItemManager } from "./ToolbarItemManager";
import { IToolbarItemManager } from "./types";
const { mxEvent, mxUtils } = mx

export class ToolbarItems {
  graph: any
  toolbar: any
  editor: any
  manager: IToolbarItemManager

  static defaults = {
  }

  defaults = ToolbarItems.defaults

  constructor(graph: any, {toolbar, props}) {
    this.graph = graph
    this.toolbar = toolbar
    this.editor = toolbar.editor, graph.editor
    this.manager = this.createManager(props)
  }

  createManager(props) {
    const { graph, toolbar } = this
    return new ToolbarItemManager(graph, toolbar, props)    
  }
}