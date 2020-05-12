import mx from "mx";
const { mxEvent, mxPopupMenuHandler, mxPopupMenu } = mx

export class PopupMenu {
  graph: any
  popupMenuHandler: any
  items: any = {}
  menu: any

  constructor(graph: any, items?: any) {
    this.graph = graph
    this.popupMenuHandler = graph.popupMenuHandler || mxPopupMenuHandler.prototype
    this.setAutoExpand(true)
    this.items = items
  }

  init() {
    this.popupMenuHandler.isSelectOnPopup = this.isSelectOnPopup
    this.popupMenuHandler.factoryMethod = this.factoryMethod
    this.menu = this.createMenu()
  }

  createMenu() {
    return new mxPopupMenu()
  }

  setItems(items) {
    this.items = items
  }

  setAutoExpand(value: boolean) {
    this.popupMenuHandler.autoExpand = value
  }
  				
  isSelectOnPopup(me) {
    return mxEvent.isMouseEvent(me.getEvent());
  };
  
    // Installs context menu
  factoryMethod(menu) {
    const { items } = this
    this.addItemsToMenu(menu, items)
  }

  addItems(items, submenu?: any) {
    this.addItemsToMenu(this.menu, items, submenu)
  }

  addItem(item, submenu?: any) {
    this.addItemToMenu(this.menu, item, submenu)
  }

  addItemsToMenu(menu, items, submenu?: any) {
    Object.keys(items).map(key => {
      const item = items[key]
      this.addItemToMenu(menu, item)
      if (item.sub) {
        const { sub } = items
        const submenu = menu.addItem(sub.title, null, null);
        this.addItemsToMenu(menu, sub.items, submenu)
      }
      return item
    })  
  }

  addItemToMenu(menu, item, submenu?: any) {
    const mi = menu.addItem(item.label, null, item.action, submenu)
    if (item.separator) {
      menu.addSeparator();
    }
    return mi
  }

}
