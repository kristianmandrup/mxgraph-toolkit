export const imageMap = {
  group: 'images/group.png',
  delete: 'images/delete2.png',
  cut: 'images/cut.png',
  copy: 'images/copy.png',
  paste: 'images/paste.png',
  undo: 'images/undo.png',
  redo: 'images/redo.png',
  show: 'images/camera.png',
  print: 'images/printer.png',
  export: 'images/export1.png',
  collapseAll: 'images/navigate_minus.png',
  expandAll: 'images/navigate_plus.png',
  enterGroup: 'images/view_next.png',
  exitGroup: 'images/view_previous.png',
  zoomIn: 'images/zoom_in.png',
  zoomOut: 'images/zoom_out.png',
  actualSize: 'images/view_1_1.png',
  fit: 'images/fit_to_size.png'
}

export const toolbarItemMap = {
  groupOrUngroup: {
    name: 'group',
    label: '(Un)group', 
    image: 'images/group.png'
  },
  delete: {
    name: 'delete',
    label: 'Delete', 
    image: 'images/delete2.png'
  },
  copyPaste: [{
    name: 'cut',
    label: 'Cut', 
    image: 'images/cut.png',
  }, {
    name: 'copy',
    label: 'Copy', 
    image: 'images/copy.png'
  }, {
    name: 'paste',
    label: 'Paste', 
    image: 'images/paste.png',
  }],
  undoRedo: [{
    name: 'undo',
    label: 'Undo',
    image: 'images/undo.png'
  }, {
    name: 'redo',
    label: 'Redo',
    image: 'images/redo.png',
  }],
  showPrint: [{
    name: 'show',
    label: 'Show', 
    image: 'images/camera.png'
  }, {
    name: 'print',
    label: 'Print', 
    image: 'images/printer.png',
  }],
  export: {    
    label: 'Export', 
    image: 'images/export1.png',         
  },
  expandCollapse: [{
    name: 'collapseAll',
    label: 'Collapse All', 
    image: 'images/navigate_minus.png'
  }, {
    name: 'expandAll',
    label: 'Expand All', 
    image: 'images/navigate_plus.png'
  }],
  enterExit: [{
    name: 'enterGroup',
    label: 'Enter', 
    image: 'images/view_next.png'
  }, {
    name: 'exitGroup',
    label: 'Exit', 
    image: 'images/view_previous.png'
  }],
  zoom: [{
    name: 'zoomIn', 
    image: 'images/zoom_in.png'
  }, {
    name: 'zoomOut', 
    image: 'images/zoom_out.png'
  }],
  size: [{
    name: 'actualSize', 
    image: 'images/view_1_1.png'
  }, {
    name: 'fit', 
    image: 'images/fit_to_size.png'
  }]
}

// top (normal) toolbar
export const top = [
  'groupOrUngroup',
  'delete',
  'copyPaste',
  'undoRedo',
  'showPrint',
  'export'
]

// status toolbar
export const status = [
  'expandCollapse',
  'enterExit',
  'zoom',
  'size'
]

export const toolbarConfig = {
  top,
  status
}

export const defaults = {
  config: {
    toolbarConfig,
    toolbarItemMap,
    imageMap
  }
}

interface ToolbarConfig { 
  toolbarConfig?: any
  toolbarItemMap?: any
  imageMap?: any
}
  

export class BasicToolbar {
  editor: any
  config: any = defaults.config

  constructor(editor: any, config: ToolbarConfig = {}) {
    this.editor = editor
    this.config = {
      ...defaults.config,
      ...config
    }
  }

  get imageMap() {
    return this.config.imageMap
  }

  get toolbarConfig() {
    return this.config.toolbarConfig
  }

  get toolbarItemMap() {
    return this.config.toolbarItemMap
  }

  toolbarKeysFor(name: string) {
    return this.toolbarConfig[name]
  }

  createToolbarNamed(name: string) {
    const toolbar = this.getToolbarNamed(name)
    const keys = this.toolbarKeysFor(name)
    this.toolbarItemsKeysFor(keys).map(key => {
      const item = this.toolbarItemMap[key]
      this.addToolbarButton(toolbar, {key, item})
    })    
  }

  addToolbarButton(toolbar, {key, item}) {
    const image = this.imageMap[key]
    item = {
      image,
      ...item
    }
    toolbar.buttons.add(item)
  }  

  toolbarItemsKeysFor(toolbarKeys) {
    return Object.keys(this.toolbarItemMap).filter(key => toolbarKeys.includes(key))
  }
  
  getToolbarNamed(name: string) {
    return this.editor.getToolbarNamed(name)
  }
}

