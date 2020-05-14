import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxCell } = mx

interface InsertVertexOpts {
  pos?: IPosition
  size?: ISize
  style?: string
  connectable?: boolean
  constituent?: boolean
  id?: string
  relative?: boolean
  geometry?: any
}

export class DrawLayer {
  layer: any
  graph: any

  defaults: any = {
    vertex: {
      size: {
        width: 26,
        height: 36
      }
    }
  }

  constructor(graph: any, layer: any, { defaults }: any = {}) {
    this.graph = graph
    this.layer = layer
    this.defaults = defaults || this.defaults
  }

  insertVertex(labelOrHtml: any, pos: IPosition, {size, style, connectable, constituent, id, relative, geometry}: InsertVertexOpts = {}): any {
    relative = relative === undefined ? true : relative
    if (constituent) {
      style = 'constituent=1;' + style
    }
    const $size: any = {
      ...this.defaults.vertex.size,
      ...size || {}
    }
    const { width, height } = $size
    const { x, y } = pos
    const vertex = this.graph.insertVertex(this.layer, id, labelOrHtml, x, y, width, height, style, relative)
    if (geometry) {
      vertex.geometry = vertex
    }    
    if (connectable === false) {
      vertex.setConnectable(false)
    }
    return vertex
  }

  insertEdge(labelOrValue: any, fromVertex: any, toVertex: any, {id, style, relative, points}: any = {}): any {
    id = id || null
    const edge = this.graph.insertEdge(this.layer, id, labelOrValue, fromVertex, toVertex, style, relative)
    if (points) this.setGeometryPoints(edge)
    return edge
  }

  addEdge(parent, edge, source, target) {
    this.graph.addEdge(edge, this.layer, source, target)
  }

  protected setGeometryPoints(cell: any, points?: any) {
    if (points) {
      points = Array.isArray(points) ? points : [points]
      cell.geometry.points = [points]
    }
    return cell
  }  
}