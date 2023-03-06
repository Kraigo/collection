import { CollectionData } from "../src"

export interface Item {
    id: number;
    name: string;
}
  
export interface FeatureState {
    items: CollectionData<Item>;
    loading: boolean;
}