# Example TypeScript Module Node Fibonacci


This is intended to demonstrate how to use the Iterator Cascade Callbacks
synchronous features within a TypeScript project that intends to `import`
source code.


- Build/transpile via;

   ```bash
   npm --workspace examples/mts_node_fibonacci run build
   ```

- Execute transpiled source code via;

   ```bash
   npm --workspace examples/mts_node_fibonacci run demo
   ```

- Or run example `src/index.ts` file directly, without transpiling, via;

   ```bash
   npx --workspace examples/mts_node_fibonacci ts-node --esm src/index.ts
   ```


To achieve the same output but without `Synchronous.Iterator_Cascade_Callbacks`
class, code may be similar to...


```javascript
let match_count = 0;
let skip_count = 0;
let collection = [];

for (let value of fibonacci()) {
  if (!(value % 2 === 0)) {
    continue;
  }

  skip_count++;
  if (skip_count <= 1) {
    continue;
  }

  collection.push(value / 2);
  match_count++;
  if (match_count >= 5) {
    break;
  }
}

console.log(collection);
```


In either case one can expect the `collection` to be;


```
[ 1, 4, 17, 72, 305 ]
```

