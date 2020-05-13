import mx from "mx";
import { createStyledElement, setStyle } from "utils";
const { mxEvent, mxUtils } = mx

export class ToolbarButtonManager {
  graph: any
  toolbar: any

  static defaults = {
    size: {
      width: 16,
      height: 16,  
    },
    style: {
      normal: {
        margin: 2,
        verticalAlign: 'middle',    
      },
      transparent: {
        background: 'transparent',
        color: 'white',
        border: 'none'  
      }  
    }
  }

  defaults = ToolbarButtonManager.defaults  

  constructor(graph: any, toolbar: any, props:any = {}) {
    this.graph = graph
    this.toolbar = toolbar
    this.defaults = props.defaults || this.defaults
  }

  get editor() {
    return this.toolbar.editor
  }

  addMap(itemMap: any) {
    Object.keys(itemMap).map(name => {
      const { action, label, image, props } = itemMap[name]
      return this.add({action, label, image, props})
    })
  }

  protected get spacer() {
    return this.toolbar.spacer
  }

  add(opts: any = {}) {
    const { action, label, image, props } = opts
    let {spacer, size, style } = props
    const { defaults } = this
    const button = createStyledElement({
      fontSize: '10'
    }, 'button');    
    size = {
      ...defaults.size,
      ...size
    }
    style = {
      ...defaults.style.normal,
      ...style || {}
    }
    const { margin, verticalAlign } = style

    if (image) {
      var img = createStyledElement({
        width: `${size.width}px`,
        height: `${size.height}px`,
        verticalAlign: verticalAlign,
        marginRight: `${margin}px`
      }, 'img')
      img.setAttribute('src', image);
      button.appendChild(img);
    }
    if (style.transparent) {
      setStyle(button, {
        ...defaults.style.transparent,
        ...style.transparent
      })
    }

    this.addButton(button, { action, label })

    if (spacer || this.spacer) {
      this.addSpacer(spacer)
    }
  }

  addButton(button, { action, label }) {
    mxEvent.addListener(button, 'click', (evt) => {
      this.editor.execute(action);
    });
    mxUtils.write(button, label);

    this.toolbar.appendChild(button);
  }

  addSpacer(spacer: any) {
    this.toolbar.appendChild(this.spacer.cloneNode(true));
  }
}  