import mx from "mx";
import { createStyledElement, setStyle } from "utils";
const { mxEvent, mxUtils } = mx

export class ToolbarItems {
  graph: any
  toolbar: any
  editor: any
  itemMap: any = {}

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

  defaults = ToolbarItems.defaults

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
    add(cellPrototype: any, iconImagePath: string, label: string, {title} : {title: string}) {

    if (!label) {
      throw new Error('Toolbar item missing label')
    }
    if (!iconImagePath) {
      throw new Error('Toolbar item missing icon image path')
    }
    const { graph, toolbar, createOnDropItem } = this
    const onDropItem = createOnDropItem(cellPrototype)

    // Creates the image which is used as the drag icon (preview)    
    const dragIconImg = toolbar.addMode(title, iconImagePath, onDropItem)
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
      const { label, title, cell, image, icon } = itemMap[name]
      return this.add(cell, image || icon, label || name, {title})
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

  protected get spacer() {
    return this.toolbar.spacer
  }

  addToolbarButton(action, label, image, props: any = {}) {
    let {spacer, size, style } = props
    const { defaults } = this
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