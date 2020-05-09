import mx from "@toolkit/mx";

import { styleMap } from './styleMaps'

export class StyleSheet {
  stylesheet: any

  constructor(stylesheet: any) {
    this.stylesheet = stylesheet
  }

  get defaultVertexStyle(): any {
    return this.stylesheet.getDefaultVertexStyle()
  }

  // indicatorShape=actor;indicatorWidth=28;indicatorColor=blue

  // Usage:
  // setVertexStyle({
  //   rounded: true,
  //   fillColor: '#ffffff'
  // })
  setVertexStyle(styles) {
    const vstyle = this.defaultVertexStyle
    Object.keys(styles).map(name => {
      const key = styleMap[name]
      vstyle[key] = styles[name]
      return key
    })
    this.putDefaultVertexStyle(vstyle)  
  }

  putDefaultVertexStyle(style) {
    this.stylesheet.putDefaultVertexStyle(style)
  };

  get defaultEdgeStyle(): any {
    return this.stylesheet.getDefaultEdgeStyle()
  }

  setDefaultEdgeStyle(style: string) {
    this.defaultEdgeStyle['edgeStyle'] = 'orthogonalEdgeStyle';
  }  
}
