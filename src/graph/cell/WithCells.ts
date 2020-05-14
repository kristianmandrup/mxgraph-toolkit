import { IAdjustment } from "types"

export class WithCells {
  graph: any
  cells: any[]
  defaultProps: any = {}

  constructor(graph: any, cells: any[], defaultProps: any = {}) {  
    this.graph = graph
    this.cells = cells
    this.defaultProps = defaultProps
  }

  disconnectFromGraph() {
    this.graph.disconnectGraph(this.cells)
    return this
  }

  remove(props: {includeEdges?: boolean} = {}) {
    props = {
      ...this.defaultProps,
      ...props
    }
    const {includeEdges} = props
    this.graph.removeCells(this.cells, includeEdges)
    return this
  }

  move(pos: IAdjustment) {
    this.graph.moveCells(this.cells, pos.dx, pos.dy)
    return this
  }    

  show(props: {includeEdges?: boolean} = {}) {
    props = {
      ...this.defaultProps,
      ...props
    }
    const {includeEdges} = props
    this.graph.toggleCells(true, this.cells, includeEdges)
    return this
  }

  hide(props: {includeEdges?: boolean} = {}) {
    props = {
      ...this.defaultProps,
      ...props
    }
    const {includeEdges} = props
    this.graph.toggleCells(false, this.cells, includeEdges)
    return this
  }

  collapse(props: {checkFoldable?: boolean, recurse?: boolean} = {}) {
    props = {
      ...this.defaultProps,
      ...props
    }
    const {checkFoldable, recurse} = props
    this.graph.foldCells(true, recurse, this.cells, checkFoldable)
    return this
  }

  expand(props: {checkFoldable?: boolean, recurse?: boolean} = {}) {
    props = {
      ...this.defaultProps,
      ...props
    }
    const {checkFoldable, recurse} = props
    this.graph.foldCells(false, recurse, this.cells, checkFoldable)
    return this
  }

  getAllEdges() {
    return this.graph.getAllEdges(this.cells)
  }  
}