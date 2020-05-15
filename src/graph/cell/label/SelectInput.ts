import mx from "mx";
import { Input } from "./Input";

export class SelectInput extends Input {
  attributeName: string = 'selectVal'
  inputType: string = 'select'
  optValueMap: any = {}
  selected: string

  constructor(graph: any, cell: any, props: any = {}) {
    super(graph, cell, props)
    this.optValueMap = props.optValueMap || {}
    this.selected = props.selected
  }

  setInputElement(inputElem) {
    const { optValueMap } = this
    this.addOptions(inputElem, optValueMap)
    inputElem.setAttribute('selected', this.selected)
  }

  addOptions(inputElem, optValueMap: any) {
    Object.entries(optValueMap).map(([key, value]) => {
      this.addOption(inputElem, key, value)    
    })
  }

  addOption(inputElem, key, value) {
    const option = new Option(key, value)
    inputElem.options.add(option)
  }
}
