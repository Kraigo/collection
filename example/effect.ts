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
        const {state} = this.store;
        this.store.setState({
            ...state,
            items: state.items.updateOne(item)
        });
    }

    removeOne(id: number) {
        const {state} = this.store;
        this.store.setState({
            ...state,
            items: state.items.removeOne(id)
        });
    }

    appendItems(items: Item[]) {
        const {state} = this.store;
        this.store.setState({
            ...state,
            items: state.items.append(items)
        });
    }
}