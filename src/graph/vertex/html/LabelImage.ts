const imageIconMap = {
  mail: {
    imagePath: 'images/icons48/mail_new.png'
  }
}

export const defaults = {
  imageIconMap
}

// TODO: 
// See HtmlLabel for making it use a real DOM element with event handlers
// and make it work with label API
export class LabelImage {
  imageIconMap: {
    [key:string]: any
  } = defaults.imageIconMap
  defaults = {
    icon: {
      size: {
        width: 48,
        height: 48
      }
    }
  }
  name: string

  constructor(name: string) {
    this.name = name
  }

  // TODO: externalise in SideIcon class
  header() {
    const { name } = this
    return `<h1 style="margin:0px;"><${name}/h1><br>`  
  }

  image() {
    const { imagePath, size } = this.imageProps()
    const { width, height } = size
    return `<img src="${imagePath}" width="${width}" height="${height}">`
  }

  imageProps() {
    const { name } = this
    return {
      ...this.defaults.icon,
      ...this.imageIconMap[name]
    }
  }
}
