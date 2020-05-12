import mx from "mx";
import { IGraph } from 'graph/Graph';
import { DrawLayer } from "./DrawLayer";
const { mxUtils, mxCell } = mx

export class Layers {
  graph: IGraph
  root: any
  currentLayerName?: string  
  layersMap: { [key:string]: any } = {
    default: new mxCell()
  }

  constructor(graph: any, root: any = new mxCell()) {
    this.graph = graph
    this.root = root
  }

  // volatile
  draw(name?: string): DrawLayer {
    this.setCurrentLayerName(name || 'default')
    return this.getDrawLayer(name)
  }

  protected createDrawLayerFrom(layer) {
    return new DrawLayer(this.graph, layer)
  }

  protected getDrawLayer(name?: string) {
    const layer = name ? this.getLayer(name) : this.getDefaultLayer()
    return this.createDrawLayerFrom(layer)
  }
  
  getDefaultLayer() {
    return this.getLayer(this.currentLayerName || 'default')
  }

  getLayer(name: string): any {
    if (!this.layersMap[name]) {
      throw new Error(`Layer ${name} has not been created`)
    }
    return this.layersMap[name]
  }

  addLayer(name: string) {
    const layer = this.root.insert(new mxCell());
    this.layersMap[name] = layer
    return layer
  }

  setCurrentLayerName(name: string) {
    this.currentLayerName = name
    return this
  }

  layerButtonFor(name: string, label: string = name): any {
    const { model } = this.graph.model
    return mxUtils.button(label, () => {
      const layer = this.getLayer(name)
      this.setCurrentLayerName(name)
      model.setVisible(layer, !model.isVisible(layer));
    })    
  }
}
