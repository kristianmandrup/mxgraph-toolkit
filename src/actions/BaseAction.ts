import mx from "mx";
import { Action } from "./Action";
const { mxResources, mxEventSource } = mx

export class BaseAction {
  // Action inherits from mxEventSource
  // mxUtils.extend(Action, mxEventSource);
  label: string
  funct: any
  enabled: boolean
  iconCls: any
  shortcut: any
  visible: boolean
  actions: any
  toggleAction: any
  selectedCallback: any

  constructor(label, funct, enabled, iconCls, shortcut) {
    // mxEventSource.call(this, label);
    this.label = label;
    this.funct = this.createFunction(funct);
    this.enabled = (enabled != null) ? enabled : true;
    this.iconCls = iconCls;
    this.shortcut = shortcut;
    this.visible = true;
  }

  /**
   * Registers the given action under the given name.
   */
  addAction(key, funct, enabled, iconCls, shortcut) {
    var title;
    
    if (key.substring(key.length - 3) == '...') {
      key = key.substring(0, key.length - 3);
      title = mxResources.get(key) + '...';
    }
    else {
      title = mxResources.get(key);
    }	
    return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
  };

  /**
   * Registers the given action under the given name.
   */
  put(name, action) {
    this.actions[name] = action;
    
    return action;
  };

  /**
   * Returns the action for the given name or null if no such action exists.
   */
  get(name) {
    return this.actions[name];
  };

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  createFunction(funct) {
    return funct;
  };

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setEnabled(value) {
    if (this.enabled != value)
    {
      this.enabled = value;
      this.dispatch('stateChanged');
    }
  };

  dispatch(event) {
    // this.fireEvent(new mxEventObject(event));
  }
  

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  isEnabled() {
    return this.enabled;
  };

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setToggleAction(value) {
    this.toggleAction = value;
  };

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  setSelectedCallback(funct) {
    this.selectedCallback = funct;
  };

  /**
   * Sets the enabled state of the action and fires a stateChanged event.
   */
  isSelected() {
    return this.selectedCallback();
  };  
}
