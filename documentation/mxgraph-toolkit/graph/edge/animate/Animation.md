# Animations

```ts
const animation = new Animation(graph)
```

Set animation style

```ts
const animateStyle = {
  animateClassName: 'edgeflow',
  strokeColor: 'blue',
  strokeWidth: 4
}
```

Aplly animation style to one or more edges

```ts
animation.animate({
  edge: e1,
  ...animateStyle
}).animate({
  edge: e2,
  ...animateStyle
})
```

## set base animation properties

Use `setBaseAnimateProps` to apply the same base animation style for each edge animation

```ts
animation.setBaseAnimateProps(animateStyle)
animation
  .animate({edge: e1})
  // override stroke color
  .animate({edge: e2, strokeColor: '#F0FEFE',})
```
