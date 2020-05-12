# StyleValidator

Validates a style

## create

```ts
const validator = new StyleValidator()
```

## string

Check is non-empty

```ts
validator.validStr(str)
```
  
## color

```ts
// by hex
validator.validColor('#FF0000')

// or by name
validator.validColor('black')
```

## path

```ts
validator.validPath('/images/car.png')
```

## position

```ts
validator.validPosition('right')
```
