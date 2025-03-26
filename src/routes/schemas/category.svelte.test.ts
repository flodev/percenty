import { describe, expect, it } from 'vitest';
import { Category } from './category.svelte';

describe('category', () => {
  it('returns 0 available percent with no categories', () => {
    const category = new Category('test', 50, [], []);
    expect(category.availablePercent).toEqual(100);
  });
  it('returns available percent with categories', () => {
    const category = new Category('test', 50, [], []);
    category.categories.push(new Category('test sub', 25, [], [], category));
    category.categories.push(new Category('test sub2', 20, [], [], category));
    expect(category.availablePercent).toEqual(55);
  });
});
