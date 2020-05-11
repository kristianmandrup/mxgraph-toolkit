export const setStyle = (element, styleMap) => {
  Object.keys(styleMap).map(key => {
    const val = styleMap[key]
    element.style[key] = val
  })
  return element
}