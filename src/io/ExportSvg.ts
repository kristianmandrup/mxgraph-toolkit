import mx from "mx";
const { mxXmlRequest, mxImageExport, mxSvgCanvas2D, mxConstants, mxCodec, mxUtils, mxClient } = mx

export class ExportSvg {
  editor: any

  setExportAction() {
    this.editor.addAction('exportSvg', this.exportSvg);
  }
  
  // Client-side code for SVG export
  exportSvg = () => {
    const { editor } = this
    var graph = editor.graph;
    var scale = graph.view.scale;
    var bounds = graph.getGraphBounds();

      // Prepares SVG document that holds the output
      var svgDoc = mxUtils.createXmlDocument();
      var root = (svgDoc.createElementNS != null) ?
        svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
      
    if (root.style != null)
    {
      root.style.backgroundColor = '#FFFFFF';
    }
    else
    {
      root.setAttribute('style', 'background-color:#FFFFFF');
    }
      
      if (svgDoc.createElementNS == null)
      {
        root.setAttribute('xmlns', mxConstants.NS_SVG);
      }
      
      root.setAttribute('width', Math.ceil(bounds.width * scale + 2) + 'px');
      root.setAttribute('height', Math.ceil(bounds.height * scale + 2) + 'px');
      root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
      root.setAttribute('version', '1.1');
      
      // Adds group for anti-aliasing via transform
      var group = (svgDoc.createElementNS != null) ?
          svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
    group.setAttribute('transform', 'translate(0.5,0.5)');
    root.appendChild(group);
      svgDoc.appendChild(root);

      // Renders graph. Offset will be multiplied with state's scale when painting state.
      var svgCanvas = new mxSvgCanvas2D(group);
      svgCanvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
      svgCanvas.scale(scale);
      
      var imgExport = new mxImageExport();
      imgExport.drawState(graph.getView().getState(graph.model.root), svgCanvas);

    var name = 'export.svg';
      var xml = encodeURIComponent(mxUtils.getXml(root));
    
    const style = 'filename=' + name + '&format=svg' + '&xml=' + xml
    const request = new mxXmlRequest(editor.urlEcho, style, null, null, null, null)
    request.simulate(document, "_blank");
  }  
}