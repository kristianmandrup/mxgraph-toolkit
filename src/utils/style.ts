export const createStyledElement = (styleMap: any, tagName: string = 'div') => {
  const container = document.createElement(tagName);  
  return setStyledElement(container, styleMap)
}

export const setStyledElement = (element, styleMap) => {
  return setObjectProp(element, styleMap, 'style')
}

export const setObjectProp = (obj, objMap, propName = 'style') => {
  const keys = Object.keys(objMap)
  keys.map(key => {
    const val = objMap[key]
    obj[propName][key] = val
  })
  return obj
}