import mx from "mx";
const { mxRectangle, mxPoint, mxUtils } = mx
import { IPosition, ISize } from 'types';
import { SidebarItem } from "./SidebarItem";
export interface IaddSidebarIcon {
  guides?: boolean
  title?: string
  dragBorder?: string
  dragSize?: ISize
  imageSize?: ISize
  vertexSize?: ISize
  createPorts(graph: any, vertex: any)
  createVertex(graph: any, labelOrHtml: string, pos: IPosition, size?: ISize)
}

export class Sidebar {
  editor: any
  sidebarElement: Element
  sidebarItem: SidebarItem

  constructor(editor: any, {sidebarElement, sidebarItem}) {
    this.editor = editor
    this.sidebarElement = sidebarElement
    this.sidebarItem = sidebarItem || this.createSidebarItem()
  }

  createSidebarItem() {
    return new SidebarItem(this.graph, this)
  }

  get graph() {
    return this.editor.graph
  }

  // from ports.html
  addSidebarIcon(graph, labelOrHtml: string, image, props: IaddSidebarIcon) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.    
    // Creates the image which is used as the sidebar icon (drag source)
    let { guides, imageSize, dragSize, dragBorder, title } = props
    const imgSize = {
      width: 48,
      height: 48,
      ...imageSize
    }
    dragSize = {
      width: 120,
      height: 120,
      ...dragSize
    }
    const { sidebarItem } = this

    const img = sidebarItem.createImageIcon(image, imgSize, title)

    this.sidebarElement.appendChild(img);
    const dragElem = sidebarItem.createDragElement({size: dragSize, border: dragBorder})
    
    const onDrag = sidebarItem.createOnDrag(labelOrHtml, props)

    // Creates the image which is used as the drag icon (preview)
    var ds = mxUtils.makeDraggable(img, graph, onDrag, dragElem, 0, 0, true, true);

    // by default guides are enabled
    const guidesEnables = guides !== false
    if (guidesEnables) {
      ds.setGuidesEnabled(true);
    }    
  } 
}
