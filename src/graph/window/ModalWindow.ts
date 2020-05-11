import mx from "../../mx";
import { createStyledElement } from "utils";
import { defaults } from "defaults";
const { mxEvent, mxUtils, mxWindow, mxEffects } = mx

const isValidEvt = (evt) => !mxEvent.isConsumed(evt)
const isValidCell = (graph, cell) => cell != null && graph.isCellEditable(cell)

const canOpenModal = (graph, evt, cell) =>
  graph.isEnabled() && isValidEvt(evt)  && isValidCell(graph, cell)

export class ModalWindow {
  graph: any  
  props: any
  _showModalWindow: any  
  
  defaults: any = {
    window: {
      position: {
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0  
      },
      style: {
        background: 'black'
      }
    }
  }

  constructor(graph: any, props: any) {
    this.graph = graph    
    this.props = props
  }

  setShowModalWindow(showModalWindow: any): any {
    this.showModalWindow = showModalWindow
    return this
  }
    
  showModalWindow(content, {title, size, position, style}) {
    position = {
      ...this.defaults.window.position,
      ...position || {}
    }
    style = {
      ...this.defaults.window.style,
      ...style || {}
    }
    const { graph } = this
    const { background } = style
    const backElem: any = this.createBackElement(position, style)
    mxUtils.setOpacity(background, 50);
    document.body.appendChild(backElem);

    const wnd: any = this.createModalWindow({title, size, content})
    this.configureWindow(wnd, style)
    graph.setEnabled(false);
    graph.tooltipHandler.hide();    
  };

  createBackElement(position: any, style: any): any {
    const { left, right, top, bottom } = position    
    const { background } = style
    return createStyledElement({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      right: `${right}px`,
      bottom: `${bottom}px`,
      background: background || 'black' 
    }, 'div')
  }

  createModalWindow({title, size, content}: any) {
    const { width, height } = size
    const maxWidth = document.body.scrollWidth / 2 - width / 2
    const x = Math.max(0, maxWidth);
    const maxHeight = (document.body.scrollHeight || document.documentElement.scrollHeight) / 2-height * 2/3;
    const y = Math.max(10, maxHeight);
    const wnd = new mxWindow(title, content, x, y, width, height, false, true);
  }

  configureWindow(wnd, style) {
    const { graph } = this
    wnd.setClosable(true);    
    // Fades the background out after after the window has been closed
    wnd.addListener(mxEvent.DESTROY, (evt) => {
      graph.setEnabled(true);
      mxEffects.fadeOut(style.background, 50, true, 
        10, 30, true);
    });
    wnd.setVisible(true);    
  }

  modalContent(cell) {
    return this.graph.convertValueToString(cell);
  }

  onEvent(evt, cell) {
    const { graph } = this
    if (!canOpenModal(graph, evt, cell)) mxEvent.consume(evt);
    if (graph.model.isEdge(cell) || !graph.isHtmlLabel(cell)) {
      graph.startEditingAtCell(cell);
    } else {
      var content = document.createElement('div');
      content.innerHTML = this.modalContent(cell)
      const props = {        
        title: 'Properties',
        size: {
          width: 400, 
          height: 300
        },
        ...this.props
      }
      this.showModalWindow(content, props);
    }
    // Disables any default behaviour
    mxEvent.consume(evt);
  }
}  
