# Overlay

## create

```ts
const overlay = new Overlay((overlay)
```

## create image overlay

Create an image overlay via imagepath, size and optional label and cursor

```ts
createImageOverlayByPath(imagePath, size, {label, cursor})
```

```ts
overlay.createImageOverlay(image {label, cursor})
```

## add listener

```ts
overlay.addListener(type, onTriggerFn)
```