import { expect } from 'chai';
import * as fc from 'fast-check';
import { flow, identity } from 'fp-ts/lib/function';

import { just, maybe, nothing } from './maybe';

describe('Maybe kata', () => {
  describe('Functor laws', () => {
    it('Composition preservation: fmap f • fmap g ≅ fmap (f • g)', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = <A>(a: A) => String(a);
        const g = (s: string) => s.length;

        expect(
          flow(maybe.map(f), maybe.map(g))(nothing),
        ).to.deep.equal(
          maybe.map(flow(f, g))(nothing),
        );

        expect(
          flow(maybe.map(f), maybe.map(g))(just(anything)),
        ).to.deep.equal(
          maybe.map(flow(f, g))(just(anything)),
        );
      }));
    });

    it('Identity preservation: fmap id ≅ id', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        expect(
          maybe.map(identity)(nothing),
        ).to.deep.equal(
          identity(nothing),
        );

        expect(
          maybe.map(identity)(just(anything)),
        ).to.deep.equal(
          identity(just(anything)),
        );
      }));
    });
  });
});
