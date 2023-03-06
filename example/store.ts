import { Observable, map } from "rxjs";
import { Collection } from "../src/collection";
import { Store } from "./utils";
import { FeatureState, Item } from "./models";

export class FeatureStore extends Store<FeatureState> {
    items$: Observable<Item[]> = this.state$.pipe(
      map(state => Collection.toList(state.items))
    );
  
    constructor() {
      super({
        items: Collection.empty(),
        loading: false
      });
    }
}