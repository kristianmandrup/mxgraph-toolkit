export class StyleCombiner {
  combine(oldStyle: string, newStyle: string) {    
    const oldStyles = oldStyle.split(';')
    const newStyles = newStyle.split(';')
  
  
    const oldStylesMap = this.stylesToMap(oldStyles)
    const newsStylesMap = this.stylesToMap(newStyles)
    const mergedStylesMap = {
      ...oldStylesMap,
      ...newsStylesMap
    }  
    return this.explodeStyleMap(mergedStylesMap).join(';')
  }

  explodeStyleMap(styleMap: any) {
    const keys: string[] = Object.keys(styleMap) || []
    return keys.reduce((acc: string[], key) => {
      const styl = key + '=' + styleMap[key]
      return acc.concat(styl)
    }, [])
  }

  constraintsForDirections(directions: string[], count: number): {} {
    return directions.reduce((acc, direction) => {
      acc[direction] = 'x'
      return acc
    }, {})
  }

  nameOf(style): string {
    return style.split('=')[0]
  }
  
  valueOf(style): string {
    return style.split('=')[1]
  }

  stylesToMap(styles): any {
    return styles.reduce((acc, style) => {
      const name = this.nameOf(style)
      const val = this.valueOf(style)
      acc[name] = val
      return acc
    })
  }
}