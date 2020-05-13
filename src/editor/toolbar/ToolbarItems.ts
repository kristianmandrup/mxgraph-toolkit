import mx from "mx";
import { createStyledElement, setStyle } from "utils";
const { mxEvent, mxUtils } = mx

export class ToolbarItems {
  graph: any
  toolbar: any
  itemMap: any = {}  

  static defaults = {
  }

  defaults = ToolbarItems.defaults  

  constructor(graph: any, toolbar: any, props:any = {}) {
    this.graph = graph
    this.toolbar = toolbar
    this.defaults = props.defaults || this.defaults
  }

  get editor() {
    return this.toolbar.editor
  }

  // Function that is executed when the image is dropped on
  // the graph. The cell argument points to the cell under
  // the mousepointer if there is one.
  createOnDropItem = (cellPrototype: any) =>
    (graph: any, evt: any, cell: any) => {
      console.log({graph, evt, cell})
      graph.stopEditing(false);

      var pt = graph.getPointForEvent(evt);
      var vertex = graph.getModel().cloneCell(cellPrototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;
      
      graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    }
    
  add(opts: any = {}) {
    const { cell, imagePath, label, title } = opts
    if (!label) {
      throw new Error('Toolbar item missing label')
    }
    if (!imagePath) {
      throw new Error('Toolbar item missing icon image path')
    }
    const { graph, toolbar, createOnDropItem } = this
    const onDropItem = createOnDropItem(cell)

    // Creates the image which is used as the drag icon (preview)    
    const dragIconImg = toolbar.addMode(title, imagePath, onDropItem)
    this.makeDraggable({dragIconImg, onDropItem})
    const item = { 
      title,     
      dragIconImg,
      onDropItem
    }    
    this.itemMap[label] = item
    return this
  }

  get(label: string) {
    return this.itemMap[label]
  }

  set(label, item) {
    this.itemMap[label] = item
    this.makeDraggable(item)
    return this
  }

  makeDraggable(item: {dragIconImg: any, onDropItem: any}) {
    const { dragIconImg, onDropItem } = item
    mxUtils.makeDraggable(dragIconImg, this.graph, onDropItem)
    return this
  }
  
  addMap(itemMap: any) {
    Object.keys(itemMap).map(name => {
      let { label, title, cell, imagePath } = itemMap[name]
      label = label || name
      return this.add({cell, imagePath, label, title})
    })
  }
}