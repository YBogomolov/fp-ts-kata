import { expect } from 'chai';
import * as fc from 'fast-check';

import { just, maybe, nothing } from './maybe';

describe('Maybe kata', () => {
  describe('Alternative laws', () => {
    it('Left identity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        expect(maybe.alt(maybe.zero())(nothing)).to.deep.equal(nothing);
        expect(maybe.alt(maybe.zero())(just(anything))).to.deep.equal(just(anything));
      }));
    });

    it('Right identity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        expect(maybe.alt(nothing)(maybe.zero())).to.deep.equal(nothing);
        expect(maybe.alt(just(anything))(maybe.zero())).to.deep.equal(just(anything));
      }));
    });

    it('Associativity', () => {
      fc.assert(fc.property(fc.anything(), fc.anything(), fc.anything(), (a, b, c) => {
        const justA = just(a);
        const justB = just(b);
        const justC = just(c);

        expect(
          maybe.alt(justA)(maybe.alt(justB)(justC)),
        ).to.equal(
          maybe.alt(maybe.alt(justA)(justB))(justC),
        );
      }));
    });

    it('Distributivity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = <A>(a: A) => String(a);
        const g = <A>(a: A) => String(a);

        expect(
          maybe.ap(maybe.alt(just(f))(just(g)))(nothing),
        ).to.deep.equal(
          maybe.alt(maybe.ap(just(f))(nothing))(maybe.ap(just(g))(nothing)),
        );

        expect(
          maybe.ap(maybe.alt(just(f))(just(g)))(just(anything)),
        ).to.deep.equal(
          maybe.alt(maybe.ap(just(f))(just(anything)))(maybe.ap(just(g))(just(anything))),
        );
      }));
    });

    it('Annihilation', () => {
      fc.assert(fc.property(fc.func(fc.anything()), (f) => {
        expect(maybe.fmap(f)(maybe.zero())).to.deep.equal(maybe.zero());
        expect(maybe.ap(nothing)(maybe.zero())).to.deep.equal(maybe.zero());
        expect(maybe.ap(just(f))(maybe.zero())).to.deep.equal(maybe.zero());
      }));
    });
  });
});
