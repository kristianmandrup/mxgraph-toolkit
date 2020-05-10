import { Animation } from './animate'
import { Guides } from './guides';
export * from "./animate";
export * from "./guides";
 
export const classMap = {
  animate: Animation,
  guides: Guides,
}

export const defaults = {
  classMap
}

export class Edge {
  graph: any
  _animate: any
  _guides: any   
  
  classMap: {
    [key: string]: any
  } = defaults.classMap
  
  constructor(graph: any, { classMap }: any = {}) {
    this.graph = graph
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get guides() {
    this._guides = this._guides || this.createGuides()
    return this._guides
  }

  setGuides(guides?: any) {
    this._guides = guides || this.createGuides()
    return this._guides
  }

  protected createGuides(): any {
    return new this.classMap.guides()
  }  
}