import { Editor } from "editor"
import { Graph } from "graph"

export const classMap = {
  editor: Editor,
  graph: Graph,
}

export const defaults = {
  classMap
}

export class App {
  _editor: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor({ classMap }: any) {
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  $createGraph() {
    return this.classMap.graph.createGraphWithModel()
  }

  createGraph(graph?: any) {
    graph = graph || this.$createGraph()
    return this.classMap.graph(graph)    
  }

  get editor() {
    this._editor = this._editor || this.createEditor()
    return this._editor
  }

  createEditor(graph?: any) {
    graph = graph || this.createGraph()
    return this.classMap.editor(graph)
  }

  init() {
    // ...
  }
}