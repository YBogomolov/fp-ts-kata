import { Alt2 } from 'fp-ts/lib/Alt';
import { Applicative2 } from 'fp-ts/lib/Applicative';
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor';
import { Functor2 } from 'fp-ts/lib/Functor';
import { Monad2 } from 'fp-ts/lib/Monad';

// Result container:
type Failure<E> = Readonly<{ tag: 'Failure', error: E }>;
type Success<A> = Readonly<{ tag: 'Success'; value: A }>;
export type Result<E, A> = Failure<E> | Success<A>;
export const failure = <E, A>(error: E): Result<E, A> => ({ tag: 'Failure', error });
export const success = <E, A>(value: A): Result<E, A> => ({ tag: 'Success', value });

export const result: Functor2<'???'> & Applicative2<'???'> & Alt2<'???'> & Monad2<'???'> & Bifunctor2<'???'> = {};
