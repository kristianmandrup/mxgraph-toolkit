import mx from "mx";
import { IRegionCalc, RegionCalc } from "./RegionCalc";
const { mxEvent, mxUtils, mxGraph } = mx

export const getEditingValue = getFieldnameForEvent => (cell, evt) => {
  evt.fieldname = getFieldnameForEvent(cell, evt);

  return cell.value[evt.fieldname] || '';
};
								
				// Sets the new value for the given cell and trigger
export const labelChanged = (cell, newValue, trigger) => {
  var name = (trigger != null) ? trigger.fieldname : null;
  
  if (name != null)
  {
    // Clones the user object for correct undo and puts
    // the new value in the correct field.
    var value = mxUtils.clone(cell.value);
    value[name] = newValue;
    newValue = value;
    
    mxGraph.prototype.labelChanged(cell, newValue, trigger);
  }
};

export class Edit {
  graph: any
  defaultRegionName: string = 'default'

  constructor(graph: any, {defaultRegionName}: any) {
    this.graph = graph
    this.defaultRegionName = defaultRegionName || this.defaultRegionName
  }

  calcPoint(evt) {
    return mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
  }

  createRegionCalc(state): IRegionCalc {
    return new RegionCalc(state)
  }
  
  // Helper method that returns the fieldname to be used for
  // a mouse event
  getFieldnameForEvent(cell, evt) {
    if (evt === null) return 'default'
    
    // Finds the relative coordinates inside the cell
    var point = this.calcPoint(evt)
    var state = this.graph.getView().getState(cell);
    const regionCalc = this.createRegionCalc(state)
    
    if (state != null) {
      point.x -= state.x;
      point.y -= state.y;
      
      // Returns second if mouse in second half of cell
      return regionCalc.determine(point)
    }
  };  
}