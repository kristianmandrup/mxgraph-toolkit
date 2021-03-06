import mx from 'mx'
import { AbstractPalette } from './AbstractPalette'
const { mxResources } = mx

export class BasicPalette extends AbstractPalette {
  addStencilPalette: any
  /**
   * Adds the general palette to the sidebar.
   */
  addBasicPalette(dir) {
    this.addStencilPalette(
      'basic',
      mxResources.get('basic'),
      dir + '/basic.xml',
      ';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2',
      null,
      null,
      null,
      null,
      [
        this.createVertexTemplateEntry(
          'shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;',
          120,
          60,
          '',
          'Partial Rectangle'
        ),
        this.createVertexTemplateEntry(
          'shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;',
          120,
          60,
          '',
          'Partial Rectangle'
        ),
        this.createVertexTemplateEntry(
          'shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;',
          120,
          60,
          '',
          'Partial Rectangle'
        ),
        this.createVertexTemplateEntry(
          'shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;',
          120,
          60,
          '',
          'Partial Rectangle'
        ),
      ]
    )
  }
}
