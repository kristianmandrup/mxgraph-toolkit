import mx from "mx";
const { mxOutline } = mx

export class Outline {
  graph: any
  outline: any
  outlineContainer: Element

  constructor(graph: any, outlineContainer: Element) {
    this.graph = graph 
    this.outlineContainer = outlineContainer
  }

  init() {
    const { graph, outlineContainer } = this
    this.outline = new mxOutline(graph, outlineContainer);
  }
}