import { MiscPalette } from './MiscPalette'
import { BasicPalette } from './BasicPalette'
import { GeneralPalette } from './GeneralPalette'
import { ImagePalette } from './ImagePalette'
import { SearchPalette } from './SearchPalette'
import { StencilPalette } from './StencilPalette'

import mx from 'mx'
import { AdvancedShapes } from '../shapes/AdvancedShapes'
const { mxEvent, mxClient, mxResources } = mx

export class Palettes {
  paletteMap: any = {
    basic: BasicPalette,
    misc: MiscPalette,
    general: GeneralPalette,
    image: ImagePalette,
    search: SearchPalette,
    stencil: StencilPalette,
  }
  palettes: any = {}

  documentMode: any
  advancedShapes: any
  container: any
  createTitle: any
  collapsedImage: any
  expandedImage: any

  constructor(paletteMap: any) {
    this.paletteMap = paletteMap
    this.advancedShapes = new AdvancedShapes()
  }

  addAll(expansion: any = {}) {
    this.addMiscPalette(expansion.misc)
    this.addAdvancedPalette(expansion.advanced)
  }

  /**
   * Adds the general palette to the sidebar.
   */
  addMiscPalette(expand) {
    new this.paletteMap.misc().create(expand)
  }

  /**
   * Adds the container palette to the sidebar.
   */
  addAdvancedPalette(expand) {
    this.addPaletteFunctions(
      'advanced',
      mxResources.get('advanced'),
      expand != null ? expand : false,
      this.createAdvancedShapes()
    )
  }

  createAdvancedShapes() {
    return this.advancedShapes.createAdvancedShapes()
  }

  /**
   * Adds the given palette.
   */
  addPaletteFunctions(id, title, expanded, fns) {
    this.addPalette(id, title, expanded, (content) => {
      for (var i = 0; i < fns.length; i++) {
        content.appendChild(fns[i](content))
      }
    })
  }

  /**
   * Adds the given palette.
   */
  addPalette(id, title, expanded, onInit) {
    var elt = this.createTitle(title)
    this.container.appendChild(elt)

    var div = document.createElement('div')
    div.className = 'geSidebar'

    // Disables built-in pan and zoom in IE10 and later
    if (mxClient.IS_POINTER) {
      div.style.touchAction = 'none'
    }

    if (expanded) {
      onInit(div)
      onInit = null
    } else {
      div.style.display = 'none'
    }

    this.addFoldingHandler(elt, div, onInit)

    var outer = document.createElement('div')
    outer.appendChild(div)
    this.container.appendChild(outer)

    // Keeps references to the DOM nodes
    if (id != null) {
      this.palettes[id] = [elt, outer]
    }

    return div
  }

  /**
   * Create the given title element.
   */
  addFoldingHandler(title, content, funct) {
    var initialized = false

    // Avoids mixed content warning in IE6-8
    if (!mxClient.IS_IE || this.documentMode >= 8) {
      title.style.backgroundImage =
        content.style.display == 'none'
          ? "url('" + this.collapsedImage + "')"
          : "url('" + this.expandedImage + "')"
    }

    title.style.backgroundRepeat = 'no-repeat'
    title.style.backgroundPosition = '0% 50%'

    mxEvent.addListener(title, 'click', (evt) => {
      if (content.style.display == 'none') {
        if (!initialized) {
          initialized = true

          if (funct != null) {
            // Wait cursor does not show up on Mac
            title.style.cursor = 'wait'
            var prev = title.innerHTML
            title.innerHTML = mxResources.get('loading') + '...'

            window.setTimeout(
              function () {
                content.style.display = 'block'
                title.style.cursor = ''
                title.innerHTML = prev

                var fo = mxClient.NO_FO
                mxClient.NO_FO = Editor.prototype.originalNoForeignObject
                funct(content, title)
                mxClient.NO_FO = fo
              },
              mxClient.IS_FF ? 20 : 0
            )
          } else {
            content.style.display = 'block'
          }
        } else {
          content.style.display = 'block'
        }

        title.style.backgroundImage = "url('" + this.expandedImage + "')"
      } else {
        title.style.backgroundImage = "url('" + this.collapsedImage + "')"
        content.style.display = 'none'
      }

      mxEvent.consume(evt)
    })

    // Prevents focus
    if (!mxClient.IS_QUIRKS) {
      mxEvent.addListener(title, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', (evt) => {
        evt.preventDefault()
      })
    }
  }

  /**
   * Removes the palette for the given ID.
   */
  removePalette(id) {
    var elts = this.palettes[id]

    if (elts != null) {
      this.palettes[id] = null

      for (var i = 0; i < elts.length; i++) {
        this.container.removeChild(elts[i])
      }

      return true
    }

    return false
  }

  /**
   * Adds the general palette to the sidebar.
   */
  addUmlPalette(expand) {}

  addBpmnPalette(dir, expand) {}
}
