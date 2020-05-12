# Style

## create

```ts
const style = new Style({
  strokeColor: 'black',
  fillColor: 'green',
  shape: 'rectangle',
  // ...
})
```

## set validator

```ts
style.setValidator(validator)
```

## get style string value

Using `strValue`getter

```ts
stylesheet['edgeStyle'] = style.strValue
```

Using `toString()` method to convert `Style` to string value

```ts
console.log('style=' + style)
```

## setting styles

```ts
style.setStyles({
  strokeColor: 'black',
  fillColor: 'green',
  shape: 'rectangle',
  // ...
})
```

## setting/getting single style

```ts
// set
style.setStrokeColor('black')
// get
style.strokeColor
```

## protected

List of style names supported

```ts
style.styles
```

Add style to accumulator `acc` used by `strValue` reducer

```ts
style.addStyle(acc, name, value)
```