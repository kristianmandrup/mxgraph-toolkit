import mx from "mx";
import { ISize } from 'types';
import { setStyledElement } from "utils";
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

  defaults = {
    icon: {
      title: 'no title',
      calc: {
        left: (x, width) => x + width,
        top: (y, height) => y + height    
      },
      size: {
        width: 16,
        height: 16,  
      }
    }
  }

  constructor(graph: any) {
    this.graph = graph
    this.images = []
  }

  get state(): any {
    return this.graph.state
  }

  add({ gestureAction, clickAction, icon }: AddParams) {
    const { state, defaults } = this
    const img = this.createImageIcon(state, icon)
    if (gestureAction) {
      mxEvent.addGestureListeners(img, gestureAction, undefined, undefined)
    }    
    if (clickAction) {
      mxEvent.addListener(img, 'click', clickAction)
    }
              
    state.view.graph.container.appendChild(img);
    this.images.push(img);
  }

  iconPropsFor(icon) {
    const { defaults } = this
    let { title, size, calc } = icon || {}
    calc = { 
      ...defaults.icon.calc,
      ...calc,      
    }
    size = { 
      ...defaults.icon.size,
      ...size,      
    }
    title = title || defaults.icon.title
    return { ...icon, title, size, calc}
  }

  createImageIcon(state, icon) {
    let { imagePath, title, size, calc } = this.iconPropsFor(icon)
    if (!imagePath) {
      throw new Error('missing imagePath')
    }
    // Icon
    const img = mxUtils.createImage(imagePath);
    img.setAttribute('title', title);
    const left = calc.left(state.x, state.width) + 'px'
    const top = calc.top(state.y, state.height) + 'px'
    
    const { width, height } = size    
    setStyledElement(img, {
      position: 'absolute',
      cursor: 'pointer',
      width: `${width}px`,
      height: `${height}px`,
      left,
      top  
    })  
    return img
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