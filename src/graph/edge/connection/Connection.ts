import mx from "mx";
import { ISize } from 'types';
import { Dispatcher, IDispatcher } from "messaging";
const { mxGraph, mxEvent, mxCellState, mxImage, mxConnectionHandler } = mx

export class Connection {
  graph: any
  dispatcher: IDispatcher

  constructor(graph: any, { dispatcher}) {
    this.graph = graph
    this.dispatcher = dispatcher || new Dispatcher()
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

  // TODO: notify app of connection event
  dispatch(event) {
    this.dispatcher.dispatch(event)
    return this
  }

  setConnectedListener() {
    this.graph.addListener(mxEvent.CELL_CONNECTED, this.onCellConnected)  
  }
  
  onCellConnected = (sender, evt) => {
    const { graph } = this
    var model = graph.getModel();
    var edge = evt.getProperty('edge');
    var source = model.getTerminal(edge, true);
    var target = model.getTerminal(edge, false);
    const terminals = {
      source,
      target,
      edge
    }
    const states = {
      source: this.cellStateFor(source),
      target: this.cellStateFor(target),
      edge: this.cellStateFor(edge)      
    }
    const points = this.getConnectionPoints(states)
    this.dispatch({points, states, terminals})
  }  

  getConnectionConstraints({source, target, edge}) {
    return {
      source: this.sourceConnectionConstraint({edge, source}),
      target: this.targetConnectionConstraint({edge, target})
    }
  }

  getConnectionPoints({edge, source, target}) {
    return {
      source: this.sourceConnectionPoint({edge, source}),
      target: this.targetConnectionPoint({edge, target})
    }
  }

  sourceConnectionPoint({edge, source}) {
    const connConstraint = this.sourceConnectionConstraint({edge, source})
    return this.graph.getConnectionPoint(source, connConstraint)
  }

  targetConnectionPoint({edge, target}) {
    const connConstraint = this.targetConnectionConstraint({edge, target})
    return this.graph.getConnectionPoint(target, connConstraint)
  }

  // must call with mxCellState params (see cellStateFor)  
  sourceConnectionConstraint({edge, source}) {
    return this.graph.getConnectionConstraint(edge, source, true)
  }

  // must call with mxCellState params (see cellStateFor)
  targetConnectionConstraint({edge, target}) {
    return this.graph.getConnectionConstraint(edge, target, false)
  }
  
  cellStateFor(cell) {
    const { graph } = this
    return new mxCellState(graph.view, cell, graph.getCellStyle(cell));
  }  

  validateConnection(source, target): any {
    // latest edge
    const edge = source.edges[source.edges.length -1]
    const edgeTerminal = this.cellStateFor(edge);
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
