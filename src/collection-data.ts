import { Collection } from "./collection";

export class CollectionData<T> {
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

    update(items: T[]) {
        return Collection.merge(this, Collection.toData(items));
    }

    updateOne(item: T) {
        return this.update([item]);
    }

    append(items: T[]) {
        return Collection.merge(this, Collection.toData(items));
    }

    appendOne(item: T) {
        return this.append([item]);
    }

    removeOne(id: any) {
        return Collection.remove(this, id);
    }

    clear() {
        return Collection.empty();
    }

    toList() {
        return Collection.toList(this);
    }

    toJSON() {
        return this.toList();
    }
    total(): number {
        return this.order.length;
    }
}