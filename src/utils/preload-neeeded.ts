import { Observable, of, switchMap, take } from 'rxjs';
import { share } from 'rxjs/operators';

export function preloadNeeded<T>(obs: Observable<T>) {
  return switchMap((items: T) => {
    const request$ = obs.pipe(
      take(1),
      share()
    );
    const skip$ = of(items);

    if (items == null) {
      return request$;
    }
    if (Array.isArray(items) && !items.length) {
      return request$;
    }
    return skip$;
  });
}
