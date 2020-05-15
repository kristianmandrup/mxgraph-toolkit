import mx from "mx";
const { mxImageExport, mxXmlRequest, mxXmlCanvas2D, mxCodec, mxUtils, mxClient } = mx

export class ExportImage {
  editor: any

  setExportAction() {
    this.editor.addAction('exportImage', this.exportImage);
  }

  // Client-side code for image export
  exportImage = (editor) => {
    const graph = editor.graph;
    const scale = graph.view.scale;
    const bounds = graph.getGraphBounds();
    
    // New image export
    const xmlDoc = mxUtils.createXmlDocument();
    const root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);
    
      // Renders graph. Offset will be multiplied with state's scale when painting state.
    const xmlCanvas = new mxXmlCanvas2D(root);
    xmlCanvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
    xmlCanvas.scale(scale);
    
    const imgExport = new mxImageExport();
      imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
      
    // Puts request data together
    var w = Math.ceil(bounds.width * scale + 2);
    var h = Math.ceil(bounds.height * scale + 2);
    var xml = mxUtils.getXml(root);
    
    // Requests image if request is valid
    if (w > 0 && h > 0)
    {
      var name = 'export.png';
      var format = 'png';
      var bg = '&bg=#FFFFFF';
      
      const style = 'filename=' + name + '&format=' + format +
      bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)      

      const request = new mxXmlRequest(editor.urlImage, style, null, null, null, null)
      request.simulate(document, '_blank');
    }
  }
}