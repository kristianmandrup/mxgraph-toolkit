# Anchors

`Anchor` is a static class

## create constraints

```ts
const constraint = Anchor.createConstraint(x,y)

// alternatively: by position
const constraint =Anchor.createConstraintByPos(pos)

const constraints =Anchor.createConstraints([
  {x: 0, y: 20},
  {x: 0, y: 40},
])
```

## set shape edge constraints

Set list of edge constraints to apply for all shapes

```ts
Anchor.setShapeConstraints(constraints)
```

## disable shape edge constraints

Disable all shape edge constraints

```ts
Anchor.disableEdgeConstraints()
```