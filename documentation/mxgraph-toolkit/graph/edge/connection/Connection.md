# Connection

Connection image API

## create

```ts
const conn = new Connection(graph)
```

## Set connection image

```ts
const imagePath = 'images/connection.png'
conn.setConnectImageByPath(imagePath) {

// custom size
conn.setConnectImageByPath(imagePath, { width: 24, height: 24}) {

// set by image
const image = new mxImage(imagePath, 16, 16)
conn.setConnectImage(image)
```  

## validate connection

Check if connection is valid by comparing target and source cells

```ts
mxConnectionHandler.prototype.validateConnection = function(source, target	) {
  // valid
  if (source.value == 'Hello,' && target.value == 'World!') return null 
  // invalid
  return ''

  // invalid - with error message (alert)
  //return 'Invalid target'
}
```