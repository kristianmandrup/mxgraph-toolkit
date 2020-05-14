import { GroupAction } from './group'
import { ExportModel } from './exportModel'
import { UndoManager } from './undo'
import { Zoom } from './zoom'

export const classMap = {
  group: GroupAction,
  exportModel: ExportModel,
  undo: UndoManager,
  zoom: Zoom
}

export const defaults = {
  classMap
}

export class BasicEditorActions {
  editor: any
  classMap: any = defaults.classMap
  _zoom: any
  _undo: any
  _group: any
  _exportModel: any

  constructor(editor: any, { classMap }) {
    this.editor = editor
    this.classMap = classMap
  }

  get zoom() {
    return this._zoom
  }

  get undo() {
    return this._undo
  }

  get exportModel() {
    return this._exportModel
  }

  get group() {
    return this._group
  }
}