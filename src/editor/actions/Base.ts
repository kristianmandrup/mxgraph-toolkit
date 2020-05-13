export class BaseActionManager {
  graph: any
  container: Element = document.body  

  constructor(graph: any, container?: Element) {
    this.graph = graph
    this.setContainer(container)
  }  
  setContainer(container) {
    this.container = container
    return this
  }
  
  get buttons() {
    return {
    }
  }  
  getButton(name: string) {
    return this.buttons[name]
  }

  appendButton(name: string) {
    const buttonElemement = this.getButton(name)
    this.container.append(buttonElemement)
  }  
}