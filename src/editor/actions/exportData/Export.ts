import mx from "mx";
import { createStyledElement } from "utils";
const { mxUtils, mxCodec } = mx

export class ExportModel {
  editor: any
  config: any = {
    textarea: {
      size: {
        width: 400,
        height: 400
      }  
    },
    window: {
      title: 'XML'
    }
  }

  constructor(editor: any, config: any) {
    this.editor = editor
    this.config = config
  }

  get textarea() {
    return this.config.textarea
  }

  get window() {
    return this.config.window
  }

  exportModel(editor, cell) {
    const { graph, modal } = this.editor
    const textarea = this.createTextArea()
    const enc = this.createEncoder()
    const node = enc.encode(editor.graph.getModel());
    textarea.value = mxUtils.getPrettyXml(node);
    this.showExportWindow(editor, textarea)
  }

  showExportWindow(editor, textarea) {
    const { modal } = this.editor
    let { width, height } = this.textarea
    const { title } = this.window
    width = width + 10
    height = height + 40
    modal.showModalWindow(editor.graph, title, textarea, width, height);  
  }


  createEncoder() {
    return new mxCodec(mxUtils.createXmlDocument());
  }

  createTextArea() {
    const { width, height } = this.textarea
    return createStyledElement({
      width: `${width}px`,
      height: `${height}px`
    },'textarea');
  }
}
