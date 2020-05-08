# Actions

```ts
const actions = new Actions(editor)
```

Set general command properties (helpers)

```ts
const showModalWindow = (graph: any, title: string, textarea: string, width: number, height: number) => {
  // ...
}
// optionally set the function used to show a modal window (used by some commands)
actions.setProps({ showModalWindow })
```

## Group or ungroup

Calls `editor` with `ungroup` or `group` on `cell` (or currently selected cell)

```ts
actions.groupUngroup(cell)
```

## Create export modal window

```ts
const size: ISize = {
  width: 400,
  height: 200
}
createExportModal({size, title: 'Export diagram'})
```

See code for more...
