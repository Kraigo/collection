import { merge, mapTo, of } from "rxjs";
import { Effect } from "./effect";
import { FeatureStore } from "./store";

export class Component {
    constructor(private store: FeatureStore, private effect: Effect) { }

    init() {
        const items$ = merge(
            this.store.items$,
            this.effect.updateData().pipe(mapTo(of()))
        );

        // this.store.items$.pipe(
        //   preloadNeeded(this.effect.updateData())
        // );

        this.store.state$.subscribe(state => {
            console.log('STATE', state);
        });

        items$.subscribe(items => {
            console.log('ITEMS$', JSON.stringify(items));
        });
    }

    onUpdate() {
        this.effect.updateOne({
            id: 1,
            name: 'test2'
        });
    }

    onRemove() {
        this.effect.removeOne(1);
    }

    onMore() {
        this.effect.appendItems([
            {
                id: 3,
                name: 'test3'
            },
            {
                id: 4,
                name: 'test4'
            }
        ]);
    }
}