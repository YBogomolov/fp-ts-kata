import { throwNIE } from '../../../throw';
import { Maybe } from '../1 - functor/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const alt = <A>(_ma: Maybe<A>) => (_elseA: Maybe<A>): Maybe<A> => throwNIE();

// Alternative instance for Maybe:
export const maybe = {
  alt,
};
