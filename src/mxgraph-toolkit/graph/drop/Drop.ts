type isValidDropTargetFn = (cell: any) => boolean

export class Drop {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  // override to add more
  validDropTargetFnMap(): {[key: string]: isValidDropTargetFn} {
    const { graph } = this
    return {
      swimlane: (cell): boolean => {
        return graph.isSwimlane(cell);
      }
    }
  }

  isValidDropTargetFor(name: string): isValidDropTargetFn {
    return this.validDropTargetFnMap[name]
  }

  setIsValidDropTarget(isValidDropTargetFn: isValidDropTargetFn) {
    this.graph.prototype.isValidDropTarget = isValidDropTargetFn
    return this
  }  

  setIsValidDropTargetByName(name: string) {
    return this.setIsValidDropTarget(this.isValidDropTargetFor(name))    
  }  
}
