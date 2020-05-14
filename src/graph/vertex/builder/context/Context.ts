import mx from "mx";
import { createStyledElement, setStyledElement } from "utils";
const { mxCellState, mxClient, mxVertexHandler, mxUtils, mxEvent } = mx

const noOp = () => {}

export class Context {
  graph: any
  domNode: any
  vertexHandler: any
  
  cellState: any // mxCellState (wrapper of a cell)
  cell: any
  actions: any

  constructor(graph: any, {cellState, cell}: any = {}) {
    this.graph = graph
    this.cellState = cellState || new mxCellState(graph.view, cell, cell.style)
    this.cell = cellState.cell
    // this.init()
  }

  init(...args) {    
    this.vertexHandler = new mxVertexHandler(this.cellState);
    this.vertexHandler.init(...args)
    this.createContextElement()
    this.setupActions()
  }

  setupActions() {
    this.actions = this.createActions()
    return this
  }

  createActions() {
    const { graph, cell, cellState, vertexHandler } = this
    return {
      delete: (evt) => {
        graph.removeCells([cell]);
        mxEvent.consume(evt);
      },
      move: (evt) => {
        graph.graphHandler.start(cell,
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
        var pt = mxUtils.convertPoint(graph.container,
            mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        this.graph.connectionHandler.start(cellState, pt.x, pt.y);
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
    const { cellState } = this 
    if (cellState && this.domNode) {
      const { x, y, width, height } = cellState
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

  addContextIcon(imagePath, { title, size, type, style, cursor }: any = {}) {
    const { width, height } = size
    const img = this.createImage(imagePath);
    img.setAttribute('title', title);
    setStyledElement(img, style || {
      cursor: cursor || 'pointer',
      width: `${width}px`,
      height: `${height}px`
    })
    this.addContextIconClickHandler(img, type)  
    this.appendIcon(img)  
    return this
  }

  protected addContextIconClickHandler(img, type) {
    const actionFn = this.actions[type]
    mxEvent.addGestureListeners(img, (evt) => {
      // Disables dragging the image
      mxEvent.consume(evt);
    }, noOp, noOp);    
    mxEvent.addListener(img, 'click', actionFn)    
  }

  protected appendIcon(img) {
    this.domNode.appendChild(img);
  }
} 
