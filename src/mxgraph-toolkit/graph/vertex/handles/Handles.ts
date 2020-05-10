import mx from "../../../mx";
import { FirstHandle } from './FirstHandle';
import { SecondHandle } from './SecondHandle';

const { mxVertexHandler } = mx

export class Handles {
  handler: any
  shape: any
  handleMap: any = {}

  constructor(shape: any) {
    this.shape = shape
    this.handler = mxVertexHandler.prototype  
  }

  init() {
    this.registerHandle('first', this.createHandle(FirstHandle))
    this.registerHandle('second', this.createHandle(SecondHandle))				
  }

  enableRotation() {
    this.handler.rotationEnabled = true;
    return this
  }

  enableLivePreview() {
    this.handler.livePreview = true;    
    return this
  }

  registerHandle(name, handle) {
    this.handleMap[name] = handle
  }

  get state(): any {
    return this.handler.state
  }

  createHandle(clazz) {
    return new clazz(this.state).init().handle
  }

  createCustomHandles(shapeName: string) {
    const { handler } = this
    const { state } = handler
    handler.createCustomHandles = () => {
      if (state.style['shape'] === shapeName) {
        // Implements the handle for the first divider
        const handles = Object.values(this.handleMap)
        return handles
      }   
    }
  }
}
