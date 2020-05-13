import mx from "mx";
import { createStyledElement, setStyledElement } from "utils";
const { mxClient, mxVertexHandler, mxUtils, mxEvent } = mx

const noOp = () => {}

export class VertexToolHandler {
  graph: any
  domNode: any
  vertexHandler: any
  
  state: any
  actions: any

  constructor(graph: any, state: any = {}) {
    this.graph = graph
    this.state = state
    this.vertexHandler = new mxVertexHandler(state = {});    
    this.actions = this.createActions()
    // this.init()
  }

  init(...args) {    
    this.vertexHandler.init(...args)
    this.createContextElement()
  }

  createActions() {
    const { graph, state, vertexHandler } = this
    return {
      delete: (evt) => {
        graph.removeCells([state.cell]);
        mxEvent.consume(evt);
      },
      move: (evt) => {
        graph.graphHandler.start(state.cell,
          mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        graph.graphHandler.cellWasClicked = true;
        graph.isMouseDown = true;
        graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      },
      size: (evt) => {
        vertexHandler.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
        graph.isMouseDown = true;
        graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      },
      connect: (evt) => {
        var pt = mxUtils.convertPoint(this.graph.container,
            mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        this.graph.connectionHandler.start(this.state, pt.x, pt.y);
        this.graph.isMouseDown = true;
        this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      }
    }
  }

  redraw() {
    this.vertexHandler.redrawTools()
  }

  setRedrawTools() {
    this.vertexHandler.redrawTools = this.redrawTools
    return this
  }

  redrawTools() {
    const { state } = this 
    if (state && this.domNode) {
      const { x, y, width, height } = state
      var dy = (mxClient.IS_VML && document.compatMode === 'CSS1Compat') ? 20 : 4;
      const _left = x + width - 56
      const _top = y + height + dy

      const left = `${_left}px`
      const top =  `${_top}px`
      setStyledElement(this.domNode, {
        left,
        top
      })
    }
  }
  
  destroyContextIcons(...args) {
    this.vertexHandler.destroy(...args);

    if (this.domNode != null)
    {
      this.domNode.parentNode.removeChild(this.domNode);
      this.domNode = null;
    }
  };  

  createContextElement(opts: any = {}) {
    const { tagName, style } = opts
    this.domNode = createStyledElement(style || {
      position: 'absolute',
      whiteSpace: 'nowrap'
    }, tagName || 'div');
    return this
  }  
  
  createImage(src, opts: any = {}) {
    const { tagName, style } = opts
    if (mxClient.IS_IE && !mxClient.IS_SVG) {
      const display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';      
      return createStyledElement(style || {
        backgroundImage: 'url(' + src + ')',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display   
      }, tagName || 'div');
    }
    else {
      return mxUtils.createImage(src);
    }
  };  

  addContextIcon(imagePath, { title, size, type, style }: any = {}) {
    const { width, height } = size
    const img = this.createImage(imagePath);
    img.setAttribute('title', title);
    setStyledElement(img, style || {
      cursor: 'pointer',
      width: `${width}px`,
      height: `${height}px`
    })

    if (type === 'delete')
    var actionFn: any; 
    actionFn = this.actions[type]

    mxEvent.addGestureListeners(img, (evt) => {
      // Disables dragging the image
      mxEvent.consume(evt);
    }, noOp, noOp);
    
    mxEvent.addListener(img, 'click', actionFn)
    this.domNode.appendChild(img);
  }
} 

