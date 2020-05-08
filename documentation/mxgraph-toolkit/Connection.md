# Connection

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
