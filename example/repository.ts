import { delay, of } from "rxjs";

export class Repository {
    loadData() {
      return of([{ id: 1, name: 'test' }]).pipe(delay(100));
    }
}