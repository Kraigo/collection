import { Normalized } from "./normalized";

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

    update(items: T[]) {
        return Normalized.merge(this, Normalized.toData(items));
    }

    updateOne(item: T) {
        return this.update([item]);
    }

    append(items: T[]) {
        return Normalized.merge(this, Normalized.toData(items));
    }

    appendOne(item: T) {
        return this.append([item]);
    }

    removeOne(id: any) {
        return Normalized.remove(this, id);
    }

    clear() {
        return Normalized.empty();
    }

    toList() {
        return Normalized.toList(this);
    }

    toJSON() {
        return this.toList();
    }
}