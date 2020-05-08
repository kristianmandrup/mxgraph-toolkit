# Animations

```ts
const animation = new Animation(graph)
const animateStyle = {
  animateClassName: 'edgeflow',
  strokeColor: 'blue',
  strokeWidth: 4
}

animation.animate({
  edge: e1,
  ...animateStyle
}).animate({
  edge: e2,
  ...animateStyle
})
```

Use `setBaseAnimateProps` to apply the same base animation style for each edge animation

```ts
animation.setBaseAnimateProps(animateStyle)
animation.animate({edge: e1}).animate({edge: e2, strokeColor: '#F0FEFE',})
```
