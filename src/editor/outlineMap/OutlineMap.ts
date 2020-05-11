import mx from "mx";
const { mxOutline } = mx

export class OutlineMap {
  graph: any
  outline: any
  outlineElement: Element

  constructor(graph: any, outlineElement: Element) {
    this.graph = graph 
    this.outlineElement = outlineElement
  }

  init() {
    const { graph, outlineElement } = this
    this.outline = new mxOutline(graph, outlineElement);
    return this
  }
}