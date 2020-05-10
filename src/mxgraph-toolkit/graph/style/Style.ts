import mx from "@toolkit/mx";
import { StyleValidator } from './StyleValidator';

interface IStyleArgs {
  strokeColor?: string
  edgeStyle?: string
  fillColor?: string
  shape?: string
  image?: string
  verticalLabelPosition?: string
  verticalAlign?: string
  imageBackground?: string
  imageBorder?: string
  startSize?: number
  noLabel?: number
  labelPosition?: string
}

type ValidateFn = (value: any) => boolean
type StrOrNone = string | undefined
const validFn = () => true

export class Style {
  _strokeColor?: string
  _edgeStyle?: string
  _fillColor?: string
  _shape?: string
  _image?: string
  _verticalLabelPosition?: string
  _verticalAlign?: string
  _imageBackground?: string
  _imageBorder?: string
  _startSize?: number
  _noLabel?: number
  _labelPosition?: string

  validator: any = new StyleValidator()
  validColor: ValidateFn = validFn
  validPath: ValidateFn = validFn
  validPosition: ValidateFn = validFn

  constructor(props: IStyleArgs) {
    this.setStyles(props)
  }

  configValidator() {
    const { validator } = this
    const names = ['validColor', 'validPosition', 'validPath']
    names.map(name => {
      this[name] = validator[name]
    })    
  }

  setValidator(validator: any) {
    this.validator = validator
    return this
  }

  setStyles({
    strokeColor, 
    edgeStyle, 
    fillColor, 
    shape,
    image,
    imageBackground,
    imageBorder,
    verticalAlign,
    verticalLabelPosition,
    labelPosition,
  }: IStyleArgs) {
    const { 
      setStrokeColor, setEdgeStyle, setFillColor, setShape, setImage, 
      setImageBorder, setImageBackground,setVerticalAlign, 
      setVerticalLabelPosition, setLabelPosition
    } = this

    setStrokeColor(strokeColor) 
    setEdgeStyle(edgeStyle)
    setFillColor(fillColor)
    setShape(shape)
    setImage(image)
    setImageBorder(imageBorder)
    setImageBackground(imageBackground)
    setVerticalAlign(verticalAlign)
    setVerticalLabelPosition(verticalLabelPosition)
    setLabelPosition(labelPosition)
  }

  setStrokeColor(color?: string) {
    if (!this.validColor(color)) return
    this._strokeColor = color
    return this
  }

  get strokeColor(): StrOrNone {
    return this._strokeColor
  }

  setEdgeStyle(style?: string) {
    this._edgeStyle = style
    return this
  }

  get edgeStyle(): StrOrNone {
    return this._edgeStyle
  }

  setFillColor(color?: string) {
    if (!this.validColor(color)) return
    this._fillColor = color
    return this
  }

  get fillColor(): StrOrNone {
    return this._fillColor
  }

  setShape(shape?: string) {
    this._shape = shape
    return this
  }

  get shape(): StrOrNone {
    return this._shape
  }

  setImage(image?: string) {
    this._image = image
    return this
  }

  get image() {
    return this._image
  }

  setVerticalLabelPosition(pos?: string) {
    if (!this.validPosition(pos)) return
    this._verticalLabelPosition = pos
    return this
  }

  get verticalLabelPosition(): StrOrNone {
    return this._verticalLabelPosition
  }

  setVerticalAlign(align?: string) {
    this._verticalAlign = align
    return this
  }

  get verticalAlign(): StrOrNone {
    return this._verticalAlign
  }

  setImageBackground(bckgrnd: string = '') {
    this._imageBackground = bckgrnd
    return this
  }

  get imageBackground(): StrOrNone {
    return this._imageBackground
  }

  setImageBorder(border: string = '') {
    this._imageBorder = border
    return this
  }

  get imageBorder(): StrOrNone {
    return this._imageBorder
  }

  setStartSize(size: number) {
    this._startSize = size
    return this
  }

  get startSize() {
    return this._startSize
  }

  setNoLabel(value?: number) {
    this._noLabel = value
    return this
  }

  get noLabel(): any {
    return this._noLabel
  }
  
  setLabelPosition(pos?: string) {
    if (!this.validPosition(pos)) return
    this._labelPosition = pos
    return this
  }

  get labelPosition(): StrOrNone {
    return this._labelPosition
  }

  get styles() {
    return [
      'strokeColor', 'edgeStyle', 'fillColor', 'shape', 
      'verticalLabelPosition', 'verticalAlign', 'startsize',
      'image', 'imageBackground', 'imageBorder', 'noLabel',
      'labelPosition'
    ]
  } 

  addStyle(acc, name, value) {
    if (!value || value === '') return acc
    const item = [name, value].join('=')
    acc.push(item)
    return acc          
  }
  

  get style() {
    return this.styles.reduce((acc, name) => {
      const value = this[name]
      return this.addStyle(acc, name, value)
    }, []).join(';')
  }
}