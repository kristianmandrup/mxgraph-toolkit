import mx from "../../../mx";
import { ISize } from '../../../types';
const { mxUtils, mxEvent } = mx

interface Icon { 
  imagePath: string
  title?: string
  size: ISize, 
  calcLeft: (x, width) => number
  calcTop: (y, height) => number
}

type EventHandler = (evt) => void

type AddParams = {
  gestureAction?: EventHandler
  clickAction: EventHandler
  icon?: Icon
}

export class HoverIcons {
  graph: any
  images: any[] = []

  constructor(graph: any) {
    this.graph = graph
    this.images = []
  }

  get state(): any {
    return this.graph.state
  }

  add({ gestureAction, clickAction, icon }: AddParams) {
    const { state  } = this
    let { imagePath, title, size, calcLeft, calcTop } = icon || {}

    const defaults = {
      calcLeft: (x, width) => x + width,
      calcTop: (y, height) => y + height
    }

    calcLeft = calcLeft || defaults.calcLeft
    calcTop = calcTop || defaults.calcTop

    size = {      
      width: 16,
      height: 16,
      ...size,      
    }
    title = title || 'missing title'
    const { width, height } = size

    if (!imagePath) {
      throw new Error('missing imagePath')
    }

    // Icon1
    var img = mxUtils.createImage(imagePath);
    img.setAttribute('title', title);
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.style.left = calcLeft(state.x, state.width) + 'px';
    img.style.top = calcTop(state.y, state.height) + 'px';
    
    if (gestureAction) {
      mxEvent.addGestureListeners(img, gestureAction, undefined, undefined)
    }    
    if (clickAction) {
      mxEvent.addListener(img, 'click', clickAction)
    }
              
    state.view.graph.container.appendChild(img);
    this.images.push(img);
  }

  disableDrag(evt) {
    // Disables dragging the image
    mxEvent.consume(evt);        
  }

  delete(evt) {
    const { state, graph } = this
    graph.removeCells([state.cell]);
    mxEvent.consume(evt);
    this.destroyIcons();    
  }

  destroyIcons() {
    if (this.images != null) {
      for (var i = 0; i < this.images.length; i++) {
        var img = this.images[i];
        img.parentNode.removeChild(img);
      }
    }    
    this.images = [];
  };  
}