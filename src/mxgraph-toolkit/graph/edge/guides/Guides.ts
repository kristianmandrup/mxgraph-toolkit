import mx from "./mx";
const { mxConstants, mxEvent, mxGraphHandler } = mx

export class Guides {
  handler: any

  constructor() {
    this.handler = mxGraphHandler.prototype
  }

  init() {
    // Enables guides
    this.handler.guidesEnabled = true
    this.handler.useGuidesForEvent = this.useGuidesForEvent
    this.snapToTerminals()
    return this
  }

  snapToTerminals(value: boolean = true) {
    // Enables snapping waypoints to terminals
    this.handler.snapToTerminals = value;  
  }

  initStyle({color, strokeWidth}: any = {}) {
    // Defines the guides to be red (default)
    mxConstants.GUIDE_COLOR = color || '#FF0000';
    
    // Defines the guides to be 1 pixel (default)
    mxConstants.GUIDE_STROKEWIDTH = strokeWidth || 1;
  
  }
								
  // Alt disables guides
  useGuidesForEvent(me) {
    return !mxEvent.isAltDown(me.getEvent());
  }			    
}