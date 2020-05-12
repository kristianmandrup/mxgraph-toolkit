import mx from "../../mx";
const { mxStackLayout } = mx

export const createSwimlaneLayout = (graph) => new SwimlaneLayout(graph).init()

export class SwimlaneLayout {
  graph: any
  layout: any
  layoutManager: any

  constructor(graph: any, layoutManager?: any) {
    this.graph = graph
    this.setManager(layoutManager)
  
    // Creates a stack depending on the orientation of the swimlane
    const layout = new mxStackLayout(graph, false);
    this.layout = layout
  }

  setManager(layoutManager) {
    this.layoutManager = layoutManager
    return this
  }  
    
  // Keeps the lanes and pools stacked
  init() {
    const { layout } = this
    // Makes sure all children fit into the parent swimlane
    layout.resizeParent = true;          
    // Applies the size to children if parent size changes
    layout.fill = true;

    layout.isVertexIgnored = this.isVertexIgnored
    return this
  }

  // Only update the size of swimlanes
  isVertexIgnored(vertex) {
    const { graph } = this
    return !graph.isSwimlane(vertex);
  }
}