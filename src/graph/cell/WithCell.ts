import { WithCells } from "./WithCells"

type AddOpts = {
  index?: number
  source?: any
  target?: any
  absolute: boolean
}

const classMap = {
  withCells: WithCells
}

const defaults = {
  classMap
}

export class WithCell {
  graph: any
  cell: any
  defaultProps: any = {}
  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, cell: any, props: any = {}) {  
    this.graph = graph
    this.cell = cell
    this.defaultProps = props
    this.setClassMap(props.classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get parent() {
    return this.cell
  }

  alignCells(align, params) {
    this.withCells().alignCells(align, params)
    return this
  }

  add(cells, opts: AddOpts) {
    const { index, source, target, absolute } = opts  
    this.graph.addCells(cells, this.parent, index, source, target, absolute)
    return this  
  }  

  remove(props) {
    this.withCells().remove(props)
    return this
  }

  show(props) {
    this.withCells().show(props)
    return this
  }

  hide(props) {
    this.withCells().show(props)
    return this
  }

  collapse(props) {
    this.withCells().collapse(props)
    return this
  }

  expand(props) {
    this.withCells().collapse(props)
    return this
  }

  group(group, border: number = 0) {
    this.withCells().group(group, border)
    return this
  }

  createGroup(border: number = 0) {
    this.withCells().createGroup(border)
    return this
  }

  ungroup() {
    this.withCells().ungroup()
    return this
  }

  getAllEdges(props) {
    return this.withCells().getAllEdges(props)
  }

  get cells(): any[] {
    return [this.cell]
  }

  withCells(cells?: any[], props?) {
    cells = cells || this.cells
    return this.createWithCells(cells, props)
  }

  createWithCells(cells, props?) {
    return this.classMap.withCells(this.graph, cells, props)
  }
}
