import mx from "../../mx";
import { createStyledElement, setStyle } from "utils";
const { mxEvent, mxUtils } = mx

export class ToolbarItem {
  graph: any
  toolbar: any
  editor: any

  static defaults = {
    button: {
      size: {
        width: 16,
        height: 16,  
      },
      style: {
        normal: {
          margin: 2,
          verticalAlign: 'middle',    
        },
        transparent: {
          background: 'transparent',
          color: 'white',
          border: 'none'
  
        }  
      }
    }
  }

  defaults = ToolbarItem.defaults

  constructor(graph: any, toolbar: any, { defaults, editor, createOnDropItem }:any = {}) {
    this.graph = graph
    this.toolbar = toolbar
    this.editor = editor || graph.editor

    this.defaults = defaults || this.defaults

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
    let {spacer, size, style, isTransparent} = props
    const { toolbar, editor, defaults } = this
    const button = createStyledElement({
      fontSize: '10'
    }, 'button');    
    size = {
      ...defaults.button.size,
      ...size
    }
    style = {
      ...defaults.button.style.normal,
      ...style || {}
    }
    const { margin, verticalAlign } = style

    if (image) {
      var img = createStyledElement({
        width: `${size.width}px`,
        height: `${size.height}px`,
        verticalAlign: verticalAlign,
        marginRight: `${margin}px`
      }, 'img')
      img.setAttribute('src', image);
      button.appendChild(img);
    }
    if (style.transparent) {
      setStyle(button, {
        ...defaults.button.style.transparent,
        ...style.transparent
      })
    }

    this.addButton(button, { action, label })

    if (spacer || this.spacer) {
      this.addSpacer(spacer)
    }
  }

  addButton(button, { action, label }) {
    mxEvent.addListener(button, 'click', (evt) => {
      this.editor.execute(action);
    });
    mxUtils.write(button, label);
  
    this.toolbar.appendChild(button);
  }

  addSpacer(spacer: any) {
    this.toolbar.appendChild(this.spacer.cloneNode(true));
  }    
}