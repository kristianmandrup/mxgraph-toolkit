import mx from "mx";
const { mxUtils } = mx

const createHintsElement = (): Element => {
  // Displays useful hints in a small semi-transparent box.
  var hints = document.createElement('div');
  hints.style.position = 'absolute';
  hints.style.overflow = 'hidden';
  hints.style.width = '230px';
  hints.style.bottom = '56px';
  hints.style.height = '76px';
  hints.style.right = '20px';
  
  hints.style.background = 'black';
  hints.style.color = 'white';
  hints.style.fontFamily = 'Arial';
  hints.style.fontSize = '10px';
  hints.style.padding = '4px';  
  return hints
}

export class Hints {
  hints: Element

  constructor(hints?: Element) {
    this.hints = hints || createHintsElement()
    this.init()
  }

  init({opacity} = {opacity: 50}) {
    mxUtils.setOpacity(this.hints, opacity || 50);
    return this
  }

  appendToDocument() {
    document.body.appendChild(this.hints);
  }
  
  addText(text: string) {
    mxUtils.writeln(this.hints, text)
  }
}
