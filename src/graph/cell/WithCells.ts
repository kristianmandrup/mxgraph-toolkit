import mx from "mx";
import { IAdjustment } from "types"
const { mxConstants } = mx
const { 
  ALIGN_LEFT, 
  ALIGN_CENTER, 
  ALIGN_RIGHT, 
  ALIGN_TOP, 
  ALIGN_MIDDLE, 
  ALIGN_BOTTOM 
} = mxConstants

export const alignMap = {
  left: ALIGN_LEFT,
  center: ALIGN_CENTER,
  right: ALIGN_RIGHT,
  top: ALIGN_TOP,
  middle: ALIGN_MIDDLE,
  bottom:	ALIGN_BOTTOM
}

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

  alignCells(align, params) {
    const alignment = this.getAlignment(align)
    this.graph.alignCells(alignment, this.cells, params)    
    return this
  }

  getAlignment(align: string) {
    return alignMap[align] || align
  }

  orderCells(back: boolean) {
    this.graph.orderCells(back, this.cells)
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