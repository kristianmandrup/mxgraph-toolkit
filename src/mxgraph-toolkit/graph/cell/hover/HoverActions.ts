import { HoverIcons } from './HoverIcons';
import mx from "../../../mx";
const { mxEvent } = mx

export class HoverActions {
  graph: any
  hoverIcons: HoverIcons

  get state(): any {
    return this.graph.state
  }

  constructor(graph: any, hoverIcons: HoverIcons) {
    this.graph = graph
    this.hoverIcons = hoverIcons
  }

  destroyIcons() {
    this.hoverIcons.destroyIcons()
  }

  duplicate(evt) {
    const { graph, state } = this
    const { gridSize } = graph;
    graph.setSelectionCells(graph.moveCells([state.cell], gridSize, gridSize, true));
    mxEvent.consume(evt);
    this.destroyIcons();
  }  
}