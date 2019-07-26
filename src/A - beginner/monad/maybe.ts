import { throwNIE } from '../../throw';
import { fmap } from '../functor/maybe';
import { Maybe } from '../functor/maybe';

export { Maybe, just, nothing } from '../functor/maybe';

/*
Each monad could be expressed using either "of" ("pure", "return") and "flatten" or "of" and "chain" ("bind"):
- "of" wraps a value in the context;
- "flatten" rips off one layer of a container, turning F<F<A>> into F<A>;
- "chain" takes a function from A to F<B>, a value of F<A> and returns F<B>.

What's interesting – "flatten" and "chain" could be expressed in terms of each other.
*/

export const of = <A>(_a: A): Maybe<A> => throwNIE();

export const flatten = <A>(_mma: Maybe<Maybe<A>>): Maybe<A> => throwNIE();

export const chain = <A, B>(_f: (a: A) => Maybe<B>) => (_ma: Maybe<A>): Maybe<B> => throwNIE();

// Monad instance for Maybe container:
export const maybe = {
  map: fmap,
  of,
  chain,
  flatten,
};
