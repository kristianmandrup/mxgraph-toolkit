import mx from "mx";
const { mxCell, mxGeometry } = mx

export class Group {
  group: any
  name: string
  
  constructor(name: string = 'Group', label: string = 'group') {
    const group = new mxCell(name, new mxGeometry(), label);
    this.name = name
    this.group = group
  }  

  setVertex(value: boolean) {
    const { group } = this
    group.setVertex(true);
    return this
  }
  
  setConnectable(value: boolean) {
    const { group } = this
    group.setConnectable(true);
    return this
  }
}

