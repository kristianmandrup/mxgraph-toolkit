import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxCell } = mx

interface InsertVertexOpts {
  constituent?: boolean
  id?: string
  relative?: boolean
  geometry?: any
}

export class DrawLayer {
  layer: any
  graph: any

  constructor(graph: any, layer: any) {
    this.graph = graph
    this.layer = layer
  }

  insertVertex(labelOrValue: any, pos: IPosition, size: ISize, style: string, {constituent, id, relative, geometry}: InsertVertexOpts = {}): any {
    if (constituent) {
      style = 'constituent=1;' + style
    }
    const vertex = this.graph.insertVertex(this.layer, id, labelOrValue, pos.x, pos.y, size.width, size.height, style, relative)
    if (geometry) {
      vertex.geometry = vertex
    }    
    return vertex
  }

  insertEdge(labelOrValue: any, fromVertex: any, toVertex: any, style: string, {id, relative, points}: any = {}): any {
    id = id || null
    const edge = this.graph.insertEdge(this.layer, id, labelOrValue, fromVertex, toVertex, style, relative)
    if (points) this.setGeometryPoints(edge)
    return edge
  }

  protected setGeometryPoints(cell: any, points?: any) {
    if (points) {
      points = Array.isArray(points) ? points : [points]
      cell.geometry.points = [points]
    }
    return cell
  }  
}