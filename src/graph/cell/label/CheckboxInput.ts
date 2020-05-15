import mx from "mx";
import { Input } from "./Input";

export class CheckboxInput extends Input {
  attributeName: string = 'selectVal'
  inputType: string = 'select'
    
  setInputElement(inputElem) {
    const { cell } = this
    const currentPropValue = cell.getAttribute(this.attributeName)
    if (currentPropValue === 'true') {
      inputElem.setAttribute(this.attributeName, 'checked');
      inputElem.defaultChecked = true;
    }  
  }

  inputValueFor(inputElem) {
    return inputElem.checked
  }
    
  valueToSetWith(value) {
    return value ? 'true' : 'false'
  }
}
