import mx from "mx";
import { Parser } from "./Parser";
const { mxUtils, mxCodec } = mx

export class FileIO {
  graph: any  

  constructor(graph: any) {
    this.graph = graph
  }

  parse(filename: string) {
    return this.parser.parse(filename)
  }

  get parser(): Parser {
    return new Parser(this.graph)
  }

  // Parses the mxGraph XML file format
  read(filename: string) {
    const { graph } = this
    var req = mxUtils.load(filename);
    var root = req.getDocumentElement();
    var dec = new mxCodec(root.ownerDocument);
    
    dec.decode(root, graph.getModel());
  }
}