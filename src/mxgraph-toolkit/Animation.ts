export const createAnimation = (graph: any): Animation => {
  return new Animation(graph)
}

type AnimationProps = {edge?: any, animateClassName: string, strokeColor?: string, strokeWidth?: number}

export class Animation {
  graph: any
  edge: any
  _animateProps: any = Animation.defaultAnimateProps

  constructor(graph: any, edge?: any) {
    this.graph = graph
    this.edge = edge
  }

  static defaultAnimateProps() {
    return {animateClassName: 'flow', strokeColor: 'lightGray', strokeWidth: 6}
  }

  setBaseAnimateProps(props) {
    this._animateProps = props
  }

  get baseAnimateProps() {
    return this._animateProps || Animation.defaultAnimateProps
  }

  animate(props: AnimationProps) {  
    props = {
      ...Animation.defaultAnimateProps,
      ...props
    }
    const { animateClassName, strokeColor, strokeWidth} = props
    const { graph, edge } = this
    const $edge = props.edge || edge
    // Adds animation to edge shape and makes "pipe" visible
    var state = graph.view.getState($edge);
    state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
    state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', strokeWidth || 6);
    state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', strokeColor || 'lightGray');
    
    state.shape.node.getElementsByTagName('path')[1].setAttribute('class', animateClassName);
    return this
  }
}