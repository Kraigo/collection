This library helps to keep collection data, update collection.

Each call is **immutable** and returns a new collection.


```javascript
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

# Use uniq key
When you're creating a new collection you should define the uniq key, which will be used for identification to merge, update, remove and get.

It will be automatically using for append and item and throw error if there are different collection's uniq key.

_By default, it uses 'id' name for uniq key._

```javascript
const items = [
    { uniqKey: 1, name: 'test1' },
    { uniqKey: 2, name: 'test2' }
]

let collection = Collection.toData(items, 'uniqKey');
collection.getOne(2) //{ uniqKey: 2, name: 'test2' }
```

