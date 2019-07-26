import { throwNIE } from '../../throw';

// Maybe container:
type Nothing = Readonly<{ tag: 'Nothing' }>;
type Just<A> = Readonly<{ tag: 'Just'; value: A }>;
export type Maybe<A> = Nothing | Just<A>;
export const nothing: Nothing = { tag: 'Nothing' };
export const just = <A>(value: A): Just<A> => ({ tag: 'Just', value });

// Functorial `map` function (fmap):
export const fmap = <A, B>(_f: (a: A) => B) => (_ma: Maybe<A>): Maybe<B> => throwNIE();

// Functor instance for Maybe container:
export const maybe = {
  map: fmap,
};
