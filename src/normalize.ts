export class NormalizedData<T> {
    uniq: string;
    ids: {
        [key: string]: T;
    };
    order: any[];





    // updateData() {
    //     return this.repository.loadData().pipe(
    //         tap(response => {
    //             this.store.setState({
    //                 ...this.store.state,
    //                 items: Normalize.toData(response)
    //             });
    //         })
    //     );
    // }

    // updateOne(item: Item) {
    //     this.store.setState({
    //         ...this.store.state,
    //         items: Normalize.merge(this.store.state.items, Normalize.toData([item]))
    //     });
    // }

    // removeOne(id: number) {
    //     this.store.setState({
    //         ...this.store.state,
    //         items: Normalize.remove(this.store.state.items, id)
    //     });
    // }

    // appendItems(items: Item[]) {
    //     this.store.setState({
    //         ...this.store.state,
    //         items: Normalize.merge(this.store.state.items, Normalize.toData(items))
    //     });
    // }
}

export class Normalize {
    static get empty() {
        return { ids: {}, order: [], uniq: 'id' };
    }

    static toData<T>(data: Array<any>, uniq: string = 'id'): NormalizedData<T> {
        return data
            .filter(item => item != null)
            .reduce((entity, item) => {
                const id = item[uniq];
                entity.ids[id] = item;
                entity.order.push(id);
                return entity;
            }, Normalize.empty);
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

        return {
            uniq: data1.uniq,
            ids: {
                ...data1.ids,
                ...data2.ids
            },
            order: []
                .concat(data1.order)
                .concat(data2.order)
                .filter((a, i, arr) => arr.indexOf(a) === i)
        };
    }

    static remove<T>(data: NormalizedData<T>, id: any) {
        const index = data.order.indexOf(id);
        if (index < 0) return data;

        const items = Normalize.toList(data);
        items.splice(index, 1);
        return Normalize.toData<T>(items, data.uniq);
    }
}
