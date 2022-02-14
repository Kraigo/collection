import { NormalizedData } from "../src/normalize";

export interface Item {
    id: number;
    name: string;
}
  
export interface FeatureState {
    items: NormalizedData<Item>;
    loading: boolean;
}