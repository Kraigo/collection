This library helps to keep normalized data, update collection.


```
const items = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' }
]

let normalized = Normalize.toData(items);


normalized = normalized.updateOne({id: 2, name: 'Updated name'});
normalized = normalized.removeOne(2);
normalized = normalized.append({id: 3, name: 'test3'});

const list = normalized.toList();
```





