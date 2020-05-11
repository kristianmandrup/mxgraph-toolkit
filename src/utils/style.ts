export const createStyledElement = (styleMap: any, tagName: string = 'div') => {
  const container = document.createElement(tagName);  
  return setStyle(container, styleMap)
}

export const setStyle = (element, styleMap) => {
  Object.keys(styleMap).map(key => {
    const val = styleMap[key]
    element.style[key] = val
  })
  return element
}