import mx from "mx";
const { mxCodec, mxUtils, mxClient } = mx

export class DisplayModes {
  displayMode: any
  textNode: any
  graphNode: any
  editor: any

  displayXml() {
    const { graphNode, textNode, editor } = this
    graphNode.style.display = 'none';
    textNode.style.display = 'inline';
    
    var enc = new mxCodec();
    var node = enc.encode(editor.graph.getModel());
    
    textNode.value = mxUtils.getPrettyXml(node);
    textNode.originalValue = textNode.value;
    textNode.focus();
  }

  displayGraphical() {
    const { graphNode, textNode, editor } = this
    graphNode.style.display = '';
      
    if (textNode.value != textNode.originalValue)
    {
      var doc = mxUtils.parseXml(textNode.value);
      var dec = new mxCodec(doc);
      dec.decode(doc.documentElement, editor.graph.getModel());
    }

    textNode.originalValue = null;
    
    // Makes sure nothing is selected in IE
    if (mxClient.IS_IE)
    {
      mxUtils.clearSelection();
    }

    textNode.style.display = 'none';

    // Moves the focus back to the graph
    editor.graph.container.focus();    
  }

  switchMode = () => {
    const { displayMode } = this
    displayMode.xml ? this.displayXml() : this.displayGraphical()
  }
  
  setSwitchView() {
    this.editor.addAction('switchView', this.switchMode);
  }  
}
