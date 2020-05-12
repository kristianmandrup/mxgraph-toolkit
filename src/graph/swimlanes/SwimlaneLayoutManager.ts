import mx from "mx";
import { SwimlaneLayout } from "./SwimlaneLayout";
const { mxLayoutManager } = mx

export const createSwimlaneLayoutManager = (graph, layout) => new SwimlaneLayoutManager(graph, layout).init()

export class SwimlaneLayoutManager {
  graph: any
  layoutManager: any
  layout: any

  constructor(graph: any, layout: any) {
    this.graph = graph
    const layoutManager = new mxLayoutManager(graph);
    this.layoutManager = layoutManager  
    this.layout = layout
  }

  init() {
    this.layoutManager = this.getLayout
    return this
  }

  get model(): any {
    return this.graph.model
  }

  setLayout() {
    this.layout = new SwimlaneLayout(this.graph).init()
  }

  getLayout(cell) {
    const { graph, layout, model } = this
    if (this.isValidPool(cell)) {
      layout.fill = graph.isPool(cell);      
      return layout;
    }    
    return null;
  }

  isValidPool(cell): boolean {
    const { graph, model } = this
    return !model.isEdge(cell) && graph.getModel().getChildCount(cell) > 0 &&
    (model.getParent(cell) === model.getRoot() || graph.isPool(cell))    
  }
}