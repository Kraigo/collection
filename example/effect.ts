import { tap } from "rxjs";
import { Normalize } from "../src/normalize";
import { Item } from "./models";
import { Repository } from "./repository";
import { FeatureStore } from "./store";

export class Effect {
    constructor(private store: FeatureStore, private repository: Repository) { }

    updateData() {
        return this.repository.loadData().pipe(
            tap(response => {
                this.store.setState({
                    ...this.store.state,
                    items: Normalize.toData(response)
                });
            })
        );
    }

    updateOne(item: Item) {
        this.store.setState({
            ...this.store.state,
            items: Normalize.merge(this.store.state.items, Normalize.toData([item]))
        });
    }

    removeOne(id: number) {
        this.store.setState({
            ...this.store.state,
            items: Normalize.remove(this.store.state.items, id)
        });
    }

    appendItems(items: Item[]) {
        this.store.setState({
            ...this.store.state,
            items: Normalize.merge(this.store.state.items, Normalize.toData(items))
        });
    }
}