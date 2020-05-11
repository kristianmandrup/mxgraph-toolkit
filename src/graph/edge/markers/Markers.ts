import mx from "mx";
const { mxMarker } = mx

export const markers = {
  dash: (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) => {
    var nx = unitX * (size + sw + 1);
    var ny = unitY * (size + sw + 1);

    return () => {
      canvas.begin();
      canvas.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
      canvas.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx / 2);
      canvas.stroke();
    };
  }
}

export class Markers {
  get markers() {
    return markers
  }

  constructor(public markerMap: any) {
    this.addMarkers(markerMap)
  }

  addMarkers(markerMap: {[key: string]: any}) {
    Object.keys(markerMap).map(key => this.addMarker(key))
  }

  addMarker(label, name = label) {
    // Registers and defines the custom marker
    mxMarker.addMarker(label, this.markers[name]);  
  }
}