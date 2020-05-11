export const createSwitch = (toggler, name, methodName?) => {
  return new Switch(toggler, name, methodName)
}

export class Switch {
  name: string
  methodName: string
  toggler: any

  constructor(toggler: any, name: string, methodName?: string) {
    this.toggler = toggler
    this.name = name
    this.methodName = methodName || this.createDefaultMethodName(name)
  }

  createDefaultMethodName(name = this.name) {
    return `set${name}Enabled`
  }
  
  on() {
    this.toggler[this.methodName](true)
  }

  off() {
    this.toggler[this.methodName](false)
  }
}