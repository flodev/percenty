import { describe, expect, it } from 'vitest';
import { Category } from './category';

describe('category test', () => {
  it('calculates the amount', async () => {
    const root = new Category('root', 100, [], [], undefined, 100);
    const sub20 = new Category('sub20', 20, [], [], root);
    const sub80 = new Category('sub80', 80, [], [], root);
    root.categories = [sub20, sub80];
    expect(sub20.amount).toEqual(20);
  });
  it('calculates the amount in leafes', async () => {
    const root = new Category('root', 100, [], [], undefined, 100);
    const sub20 = new Category('sub20', 20, [], [], root);
    const sub20sub60 = new Category('sub20sub60', 60, [], [], sub20);
    const sub20sub40 = new Category('sub20sub40', 40, [], [], sub20);
    sub20.categories = [sub20sub60, sub20sub40];
    const sub80 = new Category('sub80', 80, [], [], root);
    root.categories = [sub20, sub80];
    expect(sub20sub60.amount).toEqual(12);
    expect(sub20sub40.amount).toEqual(8);
  });
});
