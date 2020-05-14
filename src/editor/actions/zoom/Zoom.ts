import mx from "mx";
import { BaseActionManager } from "../base";
const { mxUtils } = mx

export class Zoom extends BaseActionManager {
  graph: any

  constructor(graph: any, container: Element) {
    super(graph, container)
  }
  
  get buttons() {
    return {
      zoomIn: this.zoomInButton(),
      zoomOut: this.zoomOutButton()
    }
  }

  zoomInButton(label: string = '+') {
    return mxUtils.button(label, this.zoomIn)
  }

  zoomIn() {
    this.graph.zoomIn();
  }

  zoomOutButton(label: string = '-') {
    return mxUtils.button(label, this.zoomOut)
  }

  zoomOut() {
    this.graph.zoomIn();
  }
}