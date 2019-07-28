import { expect } from 'chai';
import * as fc from 'fast-check';

import { just, maybe, nothing } from './maybe';

describe('Maybe kata', () => {
  describe('Monad laws', () => {
    it('Associativity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = <A>(a: A) => just(String(a));
        const g = (s: string) => just(s.length);

        expect(
          maybe.chain(g)(maybe.chain(f)(nothing)),
        ).to.deep.equal(
          maybe.chain((x) => maybe.chain(g)(f(x)))(nothing),
        );

        expect(
          maybe.chain(g)(maybe.chain(f)(just(anything))),
        ).to.deep.equal(
          maybe.chain((x) => maybe.chain(g)(f(x)))(just(anything)),
        );
      }));
    });

    it('Left identity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = <A>(a: A) => just(String(a));
        const g = <A>(_a: A) => nothing;

        expect(
          maybe.chain(f)(maybe.of(anything)),
        ).to.deep.equal(
          f(anything),
        );

        expect(
          maybe.chain(g)(maybe.of(anything)),
        ).to.deep.equal(
          g(anything),
        );
      }));
    });

    it('Right identity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        expect(
          maybe.chain(maybe.of)(nothing),
        ).to.deep.equal(
          nothing,
        );

        expect(
          maybe.chain(maybe.of)(just(anything)),
        ).to.deep.equal(
          just(anything),
        );
      }));
    });
  });
});
