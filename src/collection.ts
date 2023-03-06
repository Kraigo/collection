import { CollectionData } from "./collection-data";

export class Collection {
    static empty<T>(uniq: string = 'id'): CollectionData<T> {
        return new CollectionData(uniq, {}, []);
    }

    static toData<T>(data: Array<any>, uniq: string = 'id'): CollectionData<T> {
        return data
            .filter(item => item != null)
            .reduce((entity, item) => {
                const id = item[uniq];
                entity.ids[id] = item;
                entity.order.push(id);
                return entity;
            }, Collection.empty(uniq));
    }

    static toList<T>(data: CollectionData<T>): Array<T> {
        return data.order.map(id => data.ids[id]);
    }

    static merge<T>(
        data1: CollectionData<T>,
        data2: CollectionData<T>
    ): CollectionData<T> {
        if (data1.uniq != data2.uniq) {
            throw new Error("Unable to merge. Uniq fields doesn't match");
        }

        return new CollectionData(
            data1.uniq,
            {
                ...data1.ids,
                ...data2.ids
            },
            []
                .concat(data1.order)
                .concat(data2.order)
                .filter((a, i, arr) => arr.indexOf(a) === i)
        );
    }

    static remove<T>(data: CollectionData<T>, id: any) {
        const index = data.order.indexOf(id);
        if (index < 0) return data;

        const items = Collection.toList(data);
        items.splice(index, 1);
        return Collection.toData<T>(items, data.uniq);
    }

    static parse<T>(data: CollectionData<T> | any[] | string): CollectionData<T> {
        if (typeof data === 'string') {
            try {
                return Collection.parse(JSON.parse(data));
            } catch(e) {
                return Collection.empty();
            }
        }

        if (data instanceof CollectionData) {
            return data;
        }

        if (Array.isArray(data)) {
            return Collection.toData(data);
        }

        return Collection.empty();
    }
}
