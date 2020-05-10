# Modal Window

## create

```ts
const modal = new ModalWindow(graph, showModalWindow, props)
```

## static

### showModalWindow

```ts
ModalWindow.showModalWindow(graph, content, {title, size, background})
```

## instance

Instance methods

### modal content

```ts
modal.modalContent(cell)
```

### on event

```ts
class MyModal extends ModalWindow {
  onEvent(evt, cell) {
      // ...
  }
}
```