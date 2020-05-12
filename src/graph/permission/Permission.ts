export class Permission {
  graph: any
  locked: boolean = false
  createEdges: boolean = false
  editEdges: boolean = false
  editVertices: boolean = false
  cloneCells: boolean= false

  constructor(graph: any) {
    this.graph = graph
    this.init()
  }

  init() {
    const { graph } = this
    graph.setConnectable(this.createEdges);
    graph.setCellsLocked(this.locked);
    return this
  }

  setPermissions({locked, createEdges, editEdges, editVertices, cloneCells}: any = {}) {
    this.locked = !!locked
    this.createEdges = !!createEdges
    this.editEdges = !!editEdges
    this.editVertices = !!editVertices
    this.cloneCells = !!cloneCells
    return this
  }
}

