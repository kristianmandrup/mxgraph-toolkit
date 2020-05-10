import { IPosition } from "types"
import mx from "mx";
const { mxUtils } = mx

export interface IRegionCalc {
    determine(point: any): string
  }
  
  export class RegionCalc implements IRegionCalc {
    state: any
  
    constructor(state: any) {
      this.state = state
    }
  
    inSecondHalf(point: IPosition) {
      return point.y > this.state.height / 2
    }
  
    determine(point: IPosition): string {
      return this.inSecondHalf(point) ? 'second' : 'first'
    }
  }
  
  const createRow = (cell, {textAlign, fontSize, color, getLabel}) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.style.textAlign = textAlign || 'center';
    td.style.fontSize = fontSize || '12px';
    td.style.color = color || '#774400';
    mxUtils.write(td, getLabel(cell.value));
    tr.appendChild(td);
    return tr
  }
  
  // TODO: refactor and generalise
  export const getLabel = ({textAlign, fontSize, color, getLabels}) => (cell) => {
    var table = document.createElement('table');
    table.style.height = '100%';
    table.style.width = '100%';
    
    var body = document.createElement('tbody');
  
    getLabels = getLabels || {
      first: (value) => value.first,
      second: (value) => value.second
    }
  
    const tr1 = createRow(cell, {textAlign, fontSize, color, getLabel: getLabels.first })
    const tr2 = createRow(cell, {textAlign, fontSize, color, getLabel: getLabels.second })
      
    body.appendChild(tr1);
    body.appendChild(tr2);
    
    table.appendChild(body);
    
    return table;
  };