# Model

## create

```ts
const model = new Model()
```

## init

initializes graph model

```ts
model.init(style)
```

## set cell style

Sets `getStyle` method on model by calling `createGetStyleCollapsed`

```ts
model.setCellStyle(style)
```

## set cell style

```ts
Model.createGetStyleCollapsed(model, collapsedStyle)
```