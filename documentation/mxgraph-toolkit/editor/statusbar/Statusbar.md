# Statusbar

## create

```ts
const statusbar = new Statusbar()
```

## create statusbar element

```ts
statusbar.createStatusbarElement({position, style})
```

## init

```ts
statusbar.init()
```

## set status container

```ts
const container = statusbar.createStatusbarElement({
  padding: 6
})
statusbar.setStatusContainer(container)
```

## configure print events

By default configures:

- print to statusbar on file saved
- print to statusbar on file opened

Override to customize when to print on statusbar

```ts
statusbar.configurePrintEvents()
```

## Default print event handlers

### print on file saved

```ts
statusbar.printOnSaveFile()
```

### print on file opened

```ts
statusbar.printOnOpenFile()
```
