export class NormalizedData<T> {
    constructor(
        public uniq: string,
        public ids: {
            [key: string]: T;
        },
        public order: any[]
    ) {
    }

    getOne(id: any): T {
        return this.ids[id];
    }

    updateOne(item: T) {
        return Normalize.merge(this, Normalize.toData([item]));
    }

    append(items: T[]) {
        return Normalize.merge(this, Normalize.toData(items));
    }

    removeOne(id: any) {
        return Normalize.remove(this, id);
    }
}

export class Normalize {
    static empty<T>(uniq: string = 'id'): NormalizedData<T> {
        return new NormalizedData(uniq, {}, []);
    }

    static toData<T>(data: Array<any>, uniq: string = 'id'): NormalizedData<T> {
        return data
            .filter(item => item != null)
            .reduce((entity, item) => {
                const id = item[uniq];
                entity.ids[id] = item;
                entity.order.push(id);
                return entity;
            }, Normalize.empty(uniq));
    }

    static toList<T>(data: NormalizedData<T>): Array<T> {
        return data.order.map(id => data.ids[id]);
    }

    static merge<T>(
        data1: NormalizedData<T>,
        data2: NormalizedData<T>
    ): NormalizedData<T> {
        if (data1.uniq != data2.uniq) {
            throw new Error("Unable to merge. Uniq fields doesn't match");
        }

        return new NormalizedData(
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

    static remove<T>(data: NormalizedData<T>, id: any) {
        const index = data.order.indexOf(id);
        if (index < 0) return data;

        const items = Normalize.toList(data);
        items.splice(index, 1);
        return Normalize.toData<T>(items, data.uniq);
    }
}
