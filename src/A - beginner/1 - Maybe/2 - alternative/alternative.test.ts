import { expect } from 'chai';
import * as fc from 'fast-check';

import { just, maybe } from './maybe';

describe('Maybe kata', () => {
  describe('Alternative laws', () => {
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
  });
});
