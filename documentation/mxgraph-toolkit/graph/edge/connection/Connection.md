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

Check if connection is valid by comparing target and source cells.
Override to customize validation behaviour and logic.

```ts
validateConnection(source, target)
```

### isValidCellConnection

Validate if cells can be connected.
Override to customize validation behaviour and logic.

```ts
isValidCellConnection({source, target}): boolean {
  // validation logic  
}
```

## isValidPortConnection

Validate if ports for those cells can be connected.
Override to customize validation behaviour and logic.

```ts
isValidPortConnection({sourcePort, targetPort}, cells): boolean {
  const {source, target} = cells

  // validation logic
}
```