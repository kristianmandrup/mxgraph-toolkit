import mx from "mx";
const { mxRectangle, mxUtils } = mx

export class HoverVertexListener {
  // Defines the tolerance before removing the icons
  iconTolerance = 20;
  currentState:any = null
  currentIconSet: any = null
  graph: any

  constructor(graph: any, state: any) {
    this.graph = graph || state.view.graph
  }

  mouseDown(sender, me) {
    // Hides icons on mouse down
    if (this.currentState != null) {
        this.dragLeave(me.getEvent(), this.currentState);
        this.currentState = null;
    }
  }

  mouseMove(sender, me) {
    const { graph } = this
    if (this.currentState !== null && (me.getState() === this.currentState ||
      me.getState() == null)) {
      const tol = this.iconTolerance;
      const tmp = new mxRectangle(me.getGraphX() - tol,
        me.getGraphY() - tol, 2 * tol, 2 * tol);

      if (mxUtils.intersects(tmp, this.currentState)) {
        return;
      }
    }
    
    let tmp = graph.view.getState(me.getCell());
    
    // Ignores everything but vertices
    if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell))) {
      tmp = null;
    }

    if (tmp !== this.currentState) {
      if (this.currentState != null) {
          this.dragLeave(me.getEvent(), this.currentState);
      }    
      this.currentState = tmp;    
      if (this.currentState != null) {
          this.dragEnter(me.getEvent(), this.currentState);
      }
    }
  }

  mouseUp(sender, me) { }

  dragEnter(evt, state) {
    // const { graph } = this
    if (this.currentIconSet == null) {
      this.currentIconSet = new HoverVertexListener(null, state);
    }
  }

  dragLeave(evt, state) {
    if (this.currentIconSet != null) {
      this.currentIconSet.destroy();
      this.currentIconSet = null;
    }
  }  

  setGraphMouseListener() {
    const { graph } = this
    // Shows icons if the mouse is over a cell
    graph.addMouseListener({
      mouseDown: this.mouseDown,
      mouseMove: this.mouseMove,
      mouseUp: this.mouseUp,
      dragEnter: this.dragEnter,
      dragLeave: this.dragLeave
    });  
  }
}
