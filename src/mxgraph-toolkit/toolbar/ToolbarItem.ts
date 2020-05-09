import mx from "../mx";
const { mxEvent, mxUtils } = mx

export class ToolbarItem {
  graph: any
  toolbar: any
  editor: any

  constructor(graph: any, toolbar: any, { editor, createOnDropItem }:any = {}) {
    this.graph = graph
    this.toolbar = toolbar
    this.editor = editor || graph.editor
    if (createOnDropItem) {
      this.createOnDropItem = createOnDropItem
    }    
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

  

  add(cellPrototype: any, image: any) {
    const { graph, toolbar, createOnDropItem } = this
    const onDropItem = createOnDropItem(cellPrototype)
    // Creates the image which is used as the drag icon (preview)    
    const dragIconImg = toolbar.addMode(null, image, onDropItem);
    mxUtils.makeDraggable(dragIconImg, graph, onDropItem);
    return this
  }

  addMap(itemMap: any) {
    Object.keys(itemMap).map(name => {
      const { cell, image } = itemMap[name]
      return this.add(cell, image)
    })
  }

  execute(action) {
    this.editor.execute(action)
  }

  addToolbarButtons(itemMap: any) {
    Object.keys(itemMap).map(name => {
      const { action, label, image, props } = itemMap[name]
      return this.addToolbarButton(action, label, image, props)
    })
  }

  get spacer() {
    return this.toolbar.spacer
  }

  addToolbarButton(action, label, image, props: any = {}) {
    let {spacer, size, margin, isTransparent} = props
    const { toolbar, editor } = this
    var button = document.createElement('button');
    button.style.fontSize = '10';
    size = {
      width: 16,
      height: 16,
      ...size
    }
    margin = margin || 2

    if (image != null) {
      var img = document.createElement('img');
      img.setAttribute('src', image);
      img.style.width = `${size.width}px`;
      img.style.height = `${size.height}px`;
      img.style.verticalAlign = 'middle';
      img.style.marginRight = `${margin}px`;
      button.appendChild(img);
    }
    if (isTransparent) {
      button.style.background = 'transparent';
      button.style.color = '#FFFFFF';
      button.style.border = 'none';
    }
    mxEvent.addListener(button, 'click', (evt) => {
      editor.execute(action);
    });
    mxUtils.write(button, label);
    toolbar.appendChild(button);

    if (spacer || this.spacer) {
      toolbar.appendChild(this.spacer.cloneNode(true));
    }    
  };  
}