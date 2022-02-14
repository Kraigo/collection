import { Component } from "./component";
import { Effect } from "./effect";
import { Repository } from "./repository";
import { FeatureStore } from "./store";

export function createApp() {
    const store = new FeatureStore();
    const repository = new Repository();
    const effect = new Effect(store, repository);
    const component = new Component(store, effect);
    
    return {
        store,
        repository,
        effect,
        component,
        init: () => component.init()
    }
}