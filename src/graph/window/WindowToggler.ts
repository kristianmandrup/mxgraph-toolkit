import { Switch, createSwitch } from "graph/Switch"

export const nameMap = {
  maximizable: 'setMaximizable',
  resizable: 'setResizable',
  scrollable: 'setScrollable',
  visible: 'setVisible'
}

const defaults = {
  nameMap
}

export class WindowToggler {
  window: any
  maximizable?: Switch
  resizable?: Switch
  scrollable?: Switch
  visible?: Switch

  constructor(window: any) {
    this.window
  }

  setupSwitches(nameMap: any = defaults.nameMap) {
    Object.keys(nameMap).map(name => {
      const methodName = nameMap[name] 
      this[name] = createSwitch(this, name, methodName)
    })
  }

  switch(nameMap: any) {
    Object.keys(nameMap).map(name => {
      nameMap[name] ? this[name].on() : this[name].off() 
    })
  }

  setMaximizable(value: boolean) {
    this.window.setMaximizable(true);
  }

  setResizable(value: boolean) {
    this.window.setResizable(true);
  }

  setScrollable(value: boolean) {
    this.window.setScrollable(true);
  }

  setVisible(value: boolean) {
    this.window.setVisible(true);
  }
}