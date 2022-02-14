import { Normalize } from "./normalize";

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
        return Normalize.merge(this, Normalize.toData(items));
    }

    updateOne(item: T) {
        return this.update([item]);
    }

    append(items: T[]) {
        return Normalize.merge(this, Normalize.toData(items));
    }

    appendOne(item: T) {
        return this.append([item]);
    }

    removeOne(id: any) {
        return Normalize.remove(this, id);
    }

    clear() {
        return Normalize.empty();
    }
}