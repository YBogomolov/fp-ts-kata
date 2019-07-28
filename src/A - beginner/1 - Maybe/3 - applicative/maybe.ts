import { throwNIE } from '../../../throw';
import { Maybe } from '../1 - functor/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const of = <A>(_a: A): Maybe<A> => throwNIE();

export const ap = <A, B>(_fab: Maybe<(a: A) => B>) => (_ma: Maybe<A>): Maybe<B> => throwNIE();

export const maybe = {
  of,
  ap,
};
