import { ISize } from 'types';
import mx from "mx";
import { BasePorts } from './BasePorts';
const { mxConstants, mxPoint, mxConnectionConstraint, mxConstraintHandler, mxImage, mxShape } = mx

const createPortConnectionPointApi = (constraint: any, vertex) => {
  const { id } = constraint
  return {
    isValid: (): boolean => {
      return id != null && vertex != null && vertex.shape != null
    },  
    getPort: (): any => {
      const ports = vertex.shape.getPorts()
      return ports[id];
    },
    createConstraint: (port): any => {
      return new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
    }
  }    
}


export class Ports {
  graph: any
  handler: any // mxConstraintHandler.prototype

  constructor(graph: any) {
    this.graph = graph
    this.handler = mxConstraintHandler.prototype
  }


  setPointImageByProps(imagePath: string, size: ISize) {
    mxConstraintHandler.prototype.pointImage = new mxImage(imagePath, size.width, size.height);
  }  

  setPointImage(image: any) {
    mxConstraintHandler.prototype.pointImage = image
  }  

  setConnectionPort() {
    const { graph } = this
    const getKey = (source) => source ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
    // Sets the port for the given connection
    graph.setConnectionConstraint = (edge, terminal, source, constraint) => {
      if (constraint != null) {
        const key = getKey(source)
        graph.setCellStyles(key, constraint.id, [edge])
      }
    };
  }

  portForConnection() {
    // Returns the port for the given connection
    this.graph.getConnectionConstraint = (edge, terminal, source) => {
      const key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
      const id = edge.style[key];
      
      if (id != null) {
        var c =  new mxConnectionConstraint(undefined, undefined);
        c['id'] = id;        
        return c;
      }      
      return null;
    };
  }
			
  portConnectionPoint(createApi) {
    createApi = createApi || createPortConnectionPointApi

    const portConstaint = (api) => {
      if (!api.isValid()) return
      const port = api.getPort()
      if (port) {
        return api.createConstraint(port)
      }  
    }

    // Returns the actual point for a port by redirecting the constraint to the port
    const graphGetConnectionPoint = this.graph.getConnectionPoint;
    this.graph.getConnectionPoint = (vertex, constraint) => {
      const api = createApi(constraint, vertex)
      constraint = portConstaint(api) || constraint
      return graphGetConnectionPoint(vertex, constraint);
    };  
  }

  disableDefaultPortFunctionality() {
    // Disables existing port functionality
    this.graph.view.getTerminalPort = (state, terminal, source) => {
      return terminal;
    };
  }
  
  // define graph.getAllConnectionConstraints so it returns all 
  // possible ports for a given terminal
  setupRetrieveTerminalPorts() {
    const { graph } = this

    const isValidTerminal = (terminal) =>
      terminal != null && terminal.shape != null && terminal.shape.stencil != null

    const isVertextTerminal = (terminal) => terminal != null && graph.model.isVertex(terminal.cell)
    const portConstraint = (port) => new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);

    // Returns all possible ports for a given terminal
    graph.getAllConnectionConstraints = (terminal, source) => {
      if (isValidTerminal(terminal)) {
        // for stencils with existing constraints...
        return terminal.shape.stencil.constraints;        
      } 
      if (isVertextTerminal(terminal) && terminal.shape) {
        var ports = terminal.shape.getPorts();
        return Object.keys(ports).map(id => {
          return portConstraint(ports[id])
        })
      }
      
      return null;
    }
  }
}
