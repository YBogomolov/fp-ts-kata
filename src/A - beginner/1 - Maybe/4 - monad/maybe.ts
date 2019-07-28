import { throwNIE } from '../../../throw';
import { fmap } from '../1 - functor/maybe';
import { Maybe } from '../1 - functor/maybe';
import { of } from '../3 - applicative/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const flatten = <A>(_mma: Maybe<Maybe<A>>): Maybe<A> => throwNIE();

export const chain = <A, B>(_f: (a: A) => Maybe<B>) => (_ma: Maybe<A>): Maybe<B> => throwNIE();

// Monad instance for Maybe container:
export const maybe = {
  map: fmap,
  of,
  chain,
  flatten,
};
