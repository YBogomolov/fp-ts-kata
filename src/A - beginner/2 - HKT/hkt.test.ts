import { expect } from 'chai';
import * as fc from 'fast-check';
import { flow, identity } from 'fp-ts/lib/function';

import { failure, result, Result, success } from '.';

describe('HKT for Result', () => {
  it('should export Functor HKT', () => {
    expect(result.map).not.to.be.undefined;
  });

  it('should export Applicative HKT', () => {
    expect(result.of).not.to.be.undefined;
    expect(result.ap).not.to.be.undefined;
  });

  it('should export Alt HKT', () => {
    expect(result.alt).not.to.be.undefined;
  });

  it('should export Monad HKT', () => {
    expect(result.of).not.to.be.undefined;
    expect(result.chain).not.to.be.undefined;
  });

  it('should export Bifunctor HKT', () => {
    expect(result.mapLeft).not.to.be.undefined;
    expect(result.bimap).not.to.be.undefined;
  });

  describe('Bifunctor laws', () => {
    it('Identity', () => {
      fc.assert(fc.property(fc.anything(), fc.anything(), (error, value) => {
        expect(result.bimap(failure(error), identity, identity)).to.deep.equal(failure(error));
        expect(result.bimap(success(value), identity, identity)).to.deep.equal(success(value));
      }));
    });

    it('Consistency', () => {
      fc.assert(fc.property(fc.anything(), fc.anything(), (error, value) => {
        const f = <A>(a: A) => String(a);
        const g = <A>(a: A) => String(a);

        expect(result.bimap(failure(error), f, g)).to.deep.equal(result.mapLeft(result.map(failure(error), f), g));
        expect(result.bimap(failure(error), f, g)).to.deep.equal(result.map(result.mapLeft(failure(error), g), f));
        expect(result.bimap(success(value), f, g)).to.deep.equal(result.mapLeft(result.map(success(value), f), g));
        expect(result.bimap(success(value), f, g)).to.deep.equal(result.map(result.mapLeft(success(value), g), f));
      }));
    });

    it('Composition', () => {
      fc.assert(fc.property(fc.anything(), fc.anything(), (error, value) => {
        const f = <A>(a: A) => String(a);
        const g = (s: string) => s.length;
        const h = <A>(a: A) => String(a);
        const i = (s: string) => s.length;

        expect(
          result.bimap(failure(error), flow(f, g), flow(h, i)),
        ).to.deep.equal(
          flow(
            <E, A>(a: Result<E, A>) => result.bimap(a, f, h),
            (a: Result<string, string>) => result.bimap(a, g, i),
          )(failure(error)),
        );

        expect(
          result.bimap(success(value), flow(f, g), flow(h, i)),
        ).to.deep.equal(
          flow(
            <E, A>(a: Result<E, A>) => result.bimap(a, f, h),
            (a: Result<string, string>) => result.bimap(a, g, i),
          )(success(value)),
        );
      }));
    });
  });
});
