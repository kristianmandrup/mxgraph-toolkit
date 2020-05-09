# Guides

Manage guides for placing edges aligned with cell terminals

## create

```ts
const guides = new Guides().init()
```

## init

Sets up `handler` (`mxGraphHandler`) to have guides enabled and use `useGuidesForEvent` to determine when guides are enabled.

```ts
guides.init()
```

## snap to terminals

```ts
guides.snapToTerminals()
```

## init styles for guides

```ts
guides.initStyle()
```

## Set up Alt button to disable guides

Override this method to set your own mechanism or constraint for when to enable/disable guides.

```ts
guides.useGuidesForEvent
```
