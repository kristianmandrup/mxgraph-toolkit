import mx from "mx";
import { ISize } from 'types';
const { mxCellState, mxImage, mxConnectionHandler } = mx

export class Connection {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  init() {
    mxConnectionHandler.prototype.validateConnection = this.validateConnection
  }

  get defaultImage() {
    return new mxImage('images/connector.gif', 16, 16)
  }

  setConnectImageByPath(imagePath: string, size?: ISize) {
    size = {
      width: 16,
      height: 16,
      ...size || {}
    }
    this.setConnectImage(new mxImage(imagePath, size.width, size.height));
  }

  setConnectImage(image: any = this.defaultImage) {
    mxConnectionHandler.prototype.connectImage = image;
  }

  validateConnection(source, target): any {
    const { graph } = this
    // latest edge
    const edge = source.edges[source.edges.length -1]
    const edgeTerminal = new mxCellState(graph.view, edge, graph.getCellStyle(edge));
    const { sourcePort, targetPort } = edgeTerminal.style
    const ports = { sourcePort, targetPort }
    const cells = { source, target }
    if (this.isValidCellConnection(cells) && this.isValidPortConnection(ports, cells)) {
      return null
    }
    return ''
  }

  isValidCellConnection({source, target}) {
    return true
  }

  isValidPortConnection({sourcePort, targetPort}, cells) {
    return true
  }
}
