import { SecondLabel } from "./SecondLabel"

export class Label {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  get second() {
    return this.createSecondLabel()  
  }

  createSecondLabel() {
    return new SecondLabel(this.graph)
  }
}