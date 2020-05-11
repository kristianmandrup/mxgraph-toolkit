import { Animation } from './animate'
import { Guides } from './guides';
import { Markers } from './markers';
import { Connection } from './connection';

export * as connection from "./connection";
export * as markers from "./markers";
export * as animate from "./animate";
export * as guides from "./guides";
 
export const classMap = {
  connection: Connection,
  animate: Animation,
  guides: Guides,
  markers: Markers,
}

export const defaults = {
  classMap
}

export class Edge {
  graph: any
  _animate: any
  _connection: any
  _guides: any 
  _markers: any  
  
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
  
  get connection() {
    this._connection = this._connection || this.createConnection()
    return this._connection
  }
  
  setConnection(connection?: any) {
    this._connection = connection || this.createConnection()
    return this._connection
  }
  
  protected createConnection(): any {
    return new this.classMap.connection(this.graph)
  }   

  get markers() {
    this._markers = this._markers || this.createMarkers()
    return this._markers
  }
  
  setMarkers(markers?: any) {
    this._markers = markers || this.createMarkers()
    return this._markers
  }
  
  protected createMarkers(): any {
    return new this.classMap.markers(this.graph)
  }  

  get animate() {
    this._animate = this._animate || this.createAnimate()
    return this._animate
  }
  
  setAnimate(animate?: any) {
    this._animate = animate || this.createAnimate()
    return this._animate
  }
  
  protected createAnimate(): any {
    return new this.classMap.animate(this.graph)
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
    return new this.classMap.guides(this.graph)
  }  
}