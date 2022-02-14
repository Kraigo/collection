import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T>;
  public state$: Observable<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state() {
    return this._state$.getValue();
  }

  setState(newState: T) {
    this._state$.next(newState);
  }
}
