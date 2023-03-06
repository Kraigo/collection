This library helps to keep collection data, update collection.


```
const items = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' }
]

let collection = Collection.toData(items);


collection = collection.updateOne({id: 2, name: 'Updated name'});
collection = collection.removeOne(2);
collection = collection.append({id: 3, name: 'test3'});

const list = collection.toList();
```





