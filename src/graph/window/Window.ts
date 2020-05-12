import mx from "mx";
import { IPosition, ISize } from 'types';
import { WindowToggler } from "./WindowToggler";
const { mxWindow } = mx

export class Window {
  graph: any
  container: Element
  window: any
  _toggler: any

  constructor(graph: any, container: Element) {
    this.graph = graph
    this.container = container
  }

  get toggle(): any {
    this._toggler = this._toggler || this.createToggler()
    return this._toggler
  }

  setToggler(toggler?: any, props?: any) {
    this._toggler = toggler || this.createToggler()
    return this
  }

  createToggler(): any {
    return new WindowToggler(this.window);
  }

  get defaultPos(): IPosition {
    return {
      x: 200,
      y: 100
    }
  }

  get defaultSize(): ISize {
    return {
      width: 400,
      height: 200
    }
  }

  create(title: string, {pos, size, minimizable, movable}: {pos?: IPosition, size?: ISize, minimizable?: boolean, movable?: boolean} = {minimizable: true, movable: true}) {
    const { container, defaultPos, defaultSize } = this
    pos = {
      ...defaultPos,
      ...pos      
    }
    size = {
      ...defaultSize,
      ...pos      
    }
    const { x, y } = pos
    const { width, height } = size
    this.window = new mxWindow(title, container, x, y, width, height, minimizable, movable);
  }

  switch(nameMap: any) {
    this.toggle.switch(nameMap)
  }

  on(names: string[]) {
    this.toggle.on(names)
  }

  off(names: string[]) {  
    this.toggle.off(names)
  }
}
