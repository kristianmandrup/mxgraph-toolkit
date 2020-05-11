import mx from "mx";
import { ElementPos } from "editor/types";
import { setStyle } from "utils";
const { mxEditor, mxResources, mxEvent, mxClient, mxDivResizer } = mx

export class Statusbar {
  editor: any
  status: any
  proto: any = mxEditor.prototype

  constructor(editor: any) {
    this.editor = editor
  }

  static style = { padding: 6, height: 36, maxHeight: 24, textAlign: 'right', color: 'white'}
  static position = {bottom: 0, left: 0, right: 0}

  createStatusbarElement({position, style}: {position?: ElementPos, style?: any} = {}): Element {
    position = {
      ...Statusbar.position,
      ...position || {}
    }
    const { bottom, left, right } = position
    style = {
      ...Statusbar.style,
      ...style || {}
    }
    const { padding, height, maxHeight, textAlign, color } = style

    // Creates the div for the statusbar
    const container = document.createElement('div');
    return setStyle(container, {
      position: 'absolute',
      overflow: 'hidden',
      padding: `${padding}px`,
      'text-align': textAlign,
      left: `${left}px`,
      height: `${height}px`,
      'max-height': `${maxHeight}`,
      bottom: `${bottom}px`,
      color: color
    })
  }  

  init() {
    this.proto.setStatusContainer = this.setStatusContainer
    return this
  }

  setStatusContainer = (container) => {
    container = container || this.createStatusbarElement()
    const { proto, status } = this
    if (!status) {
      this.status = container;  
    }
    this.configurePrintEvents()
  }

  configurePrintEvents() {
    this.printOnSaveFile()
    this.printOnOpenFile()  
  }

  printOnSaveFile() {
    const { proto } = this
    // Prints the last saved time in the status bar
    // when files are saved
    proto.addListener(mxEvent.SAVE, () => {
      const { lastSavedResource } = proto
      var tstamp = new Date().toLocaleString();
      proto.setStatus((mxResources.get(lastSavedResource) ||
        lastSavedResource)+ ': ' +tstamp);
    });
  }  

  printOnOpenFile() {  
    const { proto } = this
    // Updates the statusbar to display the filename
    // when new files are opened
    proto.addListener(mxEvent.OPEN, () => {
      const { currentFileResource } = proto
      proto.setStatus((mxResources.get(currentFileResource) ||
      currentFileResource)+': '+ proto.filename);
    });  
  }
}