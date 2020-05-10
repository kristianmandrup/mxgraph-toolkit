import mx from "@toolkit/mx";
import { ISize } from '@toolkit/types';
const { mxImage, mxConnectionHandler } = mx

export class Connection {
  get defaultImage() {
    return new mxImage('images/connector.gif', 16, 16)
  }

  setConnectImageByPath(imagePath: string, size?: ISize) {
    size = {
      width: 16,
      height: 16,
      ...size || {}
    }
    this.setConnectImage(new mxImage(imagePath, size.width, size.height));
  }

  setConnectImage(image: any = this.defaultImage) {
    mxConnectionHandler.prototype.connectImage = image;
  }
}