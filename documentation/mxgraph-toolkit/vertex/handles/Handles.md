# Handles

## create

```ts
const handles = new Handles(shape)
```

## init

Register `first` and `second` handle by default

```ts
handles.init()
```

## enable rotation

Enables rotation via handles

```ts
handles.enableRotation()
```

## enable live preview

Enables live preview while rotating

```ts
handles.enableLivePreview()
```

## registerHandle

```ts
handles.registerHandle('first', handle)
```

## create handle

Creates a handle that can be registered, using a class

```ts
handles.createHandle(FirstHandle)
```

## create custom handles

For a given shape, matching the shape name passed in, use the handles registered

```ts
handles.createCustomHandles('myshape')
```

## Handle

Most custom handles should subclass the `Handle` class

## calculate handle position

```ts
handle.calcPos(maxB, minB, label)
```

## set handle style

```ts
handle.setStyle({bounds, point, pos}, label)
```
