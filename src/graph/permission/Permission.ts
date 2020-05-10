export class Permission {
  graph: any

  locked: boolean
  createEdges: boolean
  editEdges: boolean
  editVertices: boolean
  cloneCells: boolean

  constructor(graph: any, {locked, createEdges, editEdges, editVertices, cloneCells}: any = {}) {
    this.graph = graph
    this.locked = (locked != null) ? locked : false;
    this.createEdges = (createEdges != null) ? createEdges : true;
    this.editEdges = (editEdges != null) ? editEdges : true;;
    this.editVertices = (editVertices != null) ? editVertices : true;;
    this.cloneCells = (cloneCells != null) ? cloneCells : true;;
  }

  init() {
    const { graph } = this
    graph.setConnectable(this.createEdges);
    graph.setCellsLocked(this.locked);
  };  
};

