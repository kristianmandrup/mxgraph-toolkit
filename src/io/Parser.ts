import mx from "mx";
const { mxUtils } = mx

export class Parser {
  graph: any
  vertices: any = {}

  constructor(graph: any) {
    this.graph = graph
  }

  // Custom parser for simple file format
  parse(filename: string) {
    const { graph } = this
    const model = graph.getModel();
              
    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    const req = mxUtils.load(filename);
    const text = req.getText();

    const lines = text.split('\n');
    
    // Reset the lookup table for the vertices
    this.vertices = {};

    // Parses all lines (vertices must be first in the file)
    graph.getModel().beginUpdate();
    try {
      lines.map((line: string) => {
        this.parseLine(line)
      })
    } finally {
      graph.getModel().endUpdate();
    }
  }

  parseLine(line: string) {
    // Ignores comments (starting with #)
    const colon = line.indexOf(':');
    const { graph, vertices } = this

    if (line.substring(0, 1) != "#" ||
      colon == -1) {
      const comma = line.indexOf(',');
      const value = line.substring(colon+2, line.length);
      
      if (comma == -1 || comma > colon) {
        this.parseVertex(line, {comma, value})
      }
      else if (comma < colon) {
        this.parseEdge(line, {comma, colon, value})
      }
    } 
  }  

  parseVertex(line: string, { colon, value}: any) {
    const { graph, vertices } = this
    const key = line.substring(0, colon);        
    if (key.length > 0) {
      vertices[key] = graph.insertVertex(parent, null, value, 0, 0, 80, 70);
    }
  }

  parseEdge(line: string, { comma, colon, value}: any) {
    const { graph, vertices } = this
    // Looks up the vertices in the lookup table
    const source = vertices[line.substring(0, comma)];
    const target = vertices[line.substring(comma+1, colon)];
    
    if (source && target) {
      const e = graph.insertEdge(parent, null, value, source, target);

      // Uses the special 2-way style for 2-way labels
      if (value.indexOf('2-Way') >= 0) {
        e.style = '2way';
      }
    }
  }
}  