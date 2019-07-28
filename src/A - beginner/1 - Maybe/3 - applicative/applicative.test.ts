import { expect } from 'chai';
import * as fc from 'fast-check';
import { identity } from 'fp-ts/lib/function';

import { just, maybe, nothing } from './maybe';

const apply = <A>(x: A) => <B>(f: (a: A) => B) => f(x);
const compose = <A, B, C>(g: (b: B) => C) => (f: (a: A) => B) => (x: A) => g(f(x));

describe('Maybe kata', () => {
  describe('Applicative laws', () => {
    it('Identity', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        expect(maybe.ap(maybe.of(identity))(nothing)).to.deep.equal(nothing);
        expect(maybe.ap(maybe.of(identity))(just(anything))).to.deep.equal(just(anything));
      }));
    });

    it('Homomorphism', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = (x: unknown) => String(x);

        expect(maybe.ap(maybe.of(f))(maybe.of(anything))).to.deep.equal(maybe.of(f(anything)));
      }));
    });

    it('Interchange', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const f = (x: unknown) => String(x);

        expect(maybe.ap(nothing)(maybe.of(anything))).to.deep.equal(maybe.ap(maybe.of(apply(anything)))(nothing));
        expect(maybe.ap(just(f))(maybe.of(anything))).to.deep.equal(maybe.ap(maybe.of(apply(anything)))(just(f)));
      }));
    });

    it('Composition', () => {
      fc.assert(fc.property(fc.anything(), (anything) => {
        const v = just(<A>(x: A) => String(x));
        const u = just((s: string) => s.length);

        expect(
          maybe.ap(maybe.ap(maybe.ap(maybe.of(compose))(u))(v))(nothing),
        ).to.deep.equal(
          maybe.ap(u)(maybe.ap(v)(nothing)),
        );

        expect(
          maybe.ap(maybe.ap(maybe.ap(maybe.of(compose))(u))(v))(just(anything)),
        ).to.deep.equal(
          maybe.ap(u)(maybe.ap(v)(just(anything))),
        );
      }));
    });
  });
});
