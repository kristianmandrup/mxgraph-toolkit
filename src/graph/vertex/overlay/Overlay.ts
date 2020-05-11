import mx from "mx";
import { ISize } from 'types';
const { mxCellOverlay, mxImage, mxEvent } = mx

const eventTypeMap = {
  click: mxEvent.CLICK
}

type ImageOverlayOpts = {label: string, cursor: string}

export class Overlay {
  overlay: any

  constructor(overlay: any) {
    this.overlay = overlay
  }
  
  createImageOverlayByPath(imagePath: string, size: ISize, opts: ImageOverlayOpts): any {  
    const image = new mxImage(imagePath, size.width, size.height)
    return this.createImageOverlay(image, opts)
  }

  createImageOverlay(image: any, {label, cursor}: ImageOverlayOpts) {
    // Creates a new overlay with an image and a tooltip
    let overlay = new mxCellOverlay(image, label)
    overlay.cursor = 'hand'
    if (cursor) {
      overlay.cursor = cursor
    }    
    this.overlay = overlay
    return overlay
  }  
  
  addListener(type: string, onTriggerFn) {
    type = eventTypeMap[type] || type
    this.overlay.addListener(type, onTriggerFn)
  }
}