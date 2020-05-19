import { CellCreator } from './CellCreator'

export class AbstractShaper {
  cellCreator: CellCreator

  constructor(cellCreator) {
    this.cellCreator = cellCreator || this.createCellCreator()
  }

  createCellCreator() {
    return new CellCreator()
  }

  addEntry(tags, fn?) {
    this.cellCreator.addEntry(tags, fn)
  }

  cloneCell(cell, label) {
    this.cellCreator.cloneCell(cell, label)
  }

  createVertexTemplateFromCells(
    cells,
    width,
    height,
    title,
    showLabel?,
    showTitle?,
    allowCellsInserted?
  ) {
    this.cellCreator.createVertexTemplateFromCells(
      cells,
      width,
      height,
      title,
      showLabel,
      showTitle,
      allowCellsInserted
    )
  }

  createVertexTemplateFromData(
    data,
    width,
    height,
    title,
    showLabel?,
    showTitle?,
    allowCellsInserted?
  ) {
    return this.cellCreator.createVertexTemplateFromData(
      data,
      width,
      height,
      title,
      showLabel,
      showTitle,
      allowCellsInserted
    )
  }

  createVertexTemplateEntry(style, width, height, value, title, showLabel?, showTitle?, tags?) {
    return this.cellCreator.createVertexTemplateEntry(
      style,
      width,
      height,
      value,
      title,
      showLabel,
      showTitle,
      tags
    )
  }

  createVertexTemplate(
    style,
    width,
    height,
    value,
    title,
    showLabel,
    showTitle,
    allowCellsInserted
  ) {
    return this.cellCreator.createVertexTemplate(
      style,
      width,
      height,
      value,
      title,
      showLabel,
      showTitle,
      allowCellsInserted
    )
  }
}
