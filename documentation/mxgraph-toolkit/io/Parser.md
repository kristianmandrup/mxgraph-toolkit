# Parser

## create

```ts
const parser = new Parser(graph)
```

## parse

```ts
parser.parse(filename)
```

## extend Parser class

### parseLine

Used to parse a single line (string)

```ts
parseLine(line: string) {
  // ...
}
```

### parse vertex

Used to parse a single vertex description (string)

```ts
parseVertex(line: string, { colon, value}: any) {
  // ...
}
```

### parse edge

Used to parse a single edge description (string)

```ts
parseEdge(line: string, { comma, colon, value}: any) {
  // ...
}
```