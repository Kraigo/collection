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

    getOne(id: any): T | null {
        return id in this.ids
            ? this.ids[id]
            : null;
    }

    update(items: T[]) {
        items = items.filter(item => this.order.includes(item[this.uniq]))
        return Collection.merge(this, Collection.toData(items, this.uniq));
    }

    updateOne(item: T) {
        return this.update([item]);
    }

    append(items: T[]) {
        return Collection.merge(this, Collection.toData(items, this.uniq));
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

    get total(): number {
        return this.order.length;
    }
}