import mx from "mx";

const { mxCylinder, mxUtils } = mx

export const createShapeExtension = (shapeConstructor = mxCylinder) => {
  function MyShape(this: any, ...args) {
    const ctx = this
    shapeConstructor.call(ctx, undefined, undefined, undefined);
  };
  
  mxUtils.extend(MyShape, shapeConstructor);  
  return MyShape
}
