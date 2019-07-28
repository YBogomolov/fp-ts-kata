import { throwNIE } from '../../../throw';
import { fmap, Maybe } from '../1 - functor/maybe';
import { ap } from '../2 - applicative/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const zero = <A>(): Maybe<A> => throwNIE();

export const alt = <A>(_ma: Maybe<A>) => (_elseA: Maybe<A>): Maybe<A> => throwNIE();

// Alternative instance for Maybe:
export const maybe = {
  zero,
  alt,

  // Applicative & functor:
  ap,
  fmap,
};
