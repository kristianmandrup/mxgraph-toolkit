import mx from "mx";
import { getElem } from "editor/utils";
const { mxOutline } = mx

export class OutlineMap {
  graph: any
  outline: any
  _outlineElement?: Element | null

  // automatically instantiated by Editor instance using outlineElement created there
  constructor(graph: any, outlineElement?: Element) {
    this.graph = graph 
    this.setOutlineElement(outlineElement)
    this.init()
  }

  init() {
    const { graph, outlineElement } = this
    if (!outlineElement) {
      throw new Error('missing outline DOM container element')
    }
    this.outline = new mxOutline(graph, outlineElement);
    return this
  }  

  setOutlineElement(outlineElement) {
    this._outlineElement = outlineElement
    return this
  }

  get outlineElement() {
    this._outlineElement = this._outlineElement || getElem('outlineContainer')
    return this._outlineElement
  }
}