export class StyleValidator {
  validStr(str: string): boolean {
    return str !== ''
  }
  
  validColor(value: string): boolean {
    return this.validStr(value)
  }
  
  validPath(value: string): boolean {
    return this.validStr(value)
  }
  
  validPosition(value: string): boolean {
    return this.validStr(value)
  }
}
