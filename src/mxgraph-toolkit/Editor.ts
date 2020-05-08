import mx from "./mx";
const { mxEditor } = mx

const getElem = (id) => document.getElementById(id)

export class Editor {
  editor: any
  containers: any

  constructor(graph: any) {
    const editor = new mxEditor();
    this.editor = editor
    this.editor.graph = graph
  }

  init() {
    this.setContainerMap()
    return this
  }

  get defaultContainerMap(): any {
    return {
      graph: getElem('graphContainer'),
      outline: getElem('outlineContainer'),
      toolbar: getElem('toolbarContainer'),
      sidebar: getElem('sidebarContainer'),
      status: getElem('statusContainer')
    }        
  }

  setContainerMap(containers: any = {}) {
    this.containers = {
      ...this.defaultContainerMap,
      containers
    }
    return this
  }

  get graph(): any {
    return this.editor.graph;
  }

  setDefaultGroup(group) {
    this.editor.defaultGroup = group
    return this
  }

  configure(config: any) {
    this.editor.configure(config)
    return this
  }
}
