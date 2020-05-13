import mx from "mx";
const { mxImage } = mx

export class Normalizer {
  static defaults = {
    iconImage: {
      size: {
        width: 16,
        height: 16,  
      }
    }
  }

  defaults = Normalizer.defaults

  imageFor(iconImage: any) {
      if (!iconImage.src) return iconImage
      iconImage = {
        ...this.defaults.iconImage,
        ...iconImage
      }
      const { src, width, height } = iconImage
      iconImage = new mxImage(src, width, height)  
    }
}