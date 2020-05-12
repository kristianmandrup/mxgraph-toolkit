# PopupMenu

Manage and display Popup menu for cells on the graph

TODO: where or what is the menu used to add items!?

## create

PopupMenu for graph

```ts
const menu = new PopupMenu(graph)
```

With menu items

```ts
const items = {
  data: {
    label: 'data',
    action: (cell) => {
      // display data for cell
    }
  }
}
const menu = new PopupMenu(graph, items)
```

## init

Initialize `popupMenuHandler.isSelectOnPopup`.
Creates `mxPopupMenu` and sets it as internal `menu` property

```ts
menu.init()
```

## auto expand

Set if menu should auto expand all sub-menus on display

```ts
menu.setAutoExpand(true)
```

## create menu

Create and return instance of `mxPopupMenu`

```ts
menu.createMenu()
```

## is select on popup 

Default handler for `popupMenuHandler.isSelectOnPopup`.
Override to provide custom functionality (constraints)

## add items

Uses `menu` instance of `mxPopupMenu`

```ts
menu.addItemsToMenu(items)
```

With submenu

```ts
menu.addItemsToMenu(items, submenu)
```

## add item

Uses `menu` instance of `mxPopupMenu`

```ts
menu.addItem(item)
```

With submenu

```ts
menu.addItem(items, submenu)
```

## add items to menu

```ts
menu.addItemsToMenu(menu, items)
```

With submenu

```ts
menu.addItemsToMenu(menu, items, submenu)
```

## add item to menu

```ts
menu.addItemToMenu(menu, item)
```

With submenu

```ts
menu.addItemToMenu(menu, items, submenu)
```

