import { Observable, map } from "rxjs";
import { Normalize } from "../src/normalize";
import { Store } from "./utils";
import { FeatureState, Item } from "./models";

export class FeatureStore extends Store<FeatureState> {
    items$: Observable<Item[]> = this.state$.pipe(
      map(state => Normalize.toList(state.items))
    );
  
    constructor() {
      super({
        items: Normalize.empty(),
        loading: false
      });
    }
}