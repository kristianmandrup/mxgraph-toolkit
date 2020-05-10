# Ports

## create

```ts
const ports = new Ports(label)
```

## set point image

```ts
setPointImageByProps(imagePath 'images/x.png', size: {width: 16, height: 24})
```  

```ts
const image = mxImage('images/x.png', 16, 24)
setPointImage(image)
```  

## set connection port

Configures `setConnectionConstraint` for graph

```ts
ports.setConnectionPort()
```

## set connection port

Configures `getConnectionConstraint` for graph.
Returns the port for the given connection

```ts
ports.portForConnection()
```

## portConnectionPoint 

Configures `getConnectionPoint` for graph.
Returns the actual point for a port by redirecting the constraint to the port

```ts
const createApi = (constraint, vertex) => { 
    // ...
}
ports.portForConnection(createApi)
```

## disableDefaultPortFunctionality

Configures `view.getTerminalPort` for graph.
Disables existing port functionality

```ts
ports.disableDefaultPortFunctionality(createApi)
```

## disableDefaultPortFunctionality

Configures `view.getAllConnectionConstraints` for graph so it returns all 
possible ports for a given terminal

```ts
ports.setupRetrieveTerminalPorts(createApi)
```
