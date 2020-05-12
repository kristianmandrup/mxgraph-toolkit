# Swimlanes

## create

```ts
const swimlanes = new Swimlanes()
```

## properties

Returns graph model

```ts
swimlanes.model
```

## init

```ts
swimlanes.init()
```

## set layout

```ts
swimlanes.setLayout()
```

## get layout

```ts
swimlanes.getLayout(cell)
```

## is valid pool

Dermine if cell is in a valid pool for swimlane.
Used by `getLayout` to test if `fill` should be set for `layout`

```ts
swimlanes.isValidPool(cell)
```
