import { describe, expect, it } from 'vitest';
import { createCategoryTree } from './create-category-tree';
import type { CategorySchemaType } from './schema';
import { lastValueFrom } from 'rxjs';

describe('create category tree', () => {
  const testData: CategorySchemaType = {
    amount: 1000,
    name: 'root',
    categories: [
      {
        name: 'risk part',
        percent: 80,
        categories: [
          {
            name: 'ETFs',
            percent: 70,
            categories: [],
            percentages: [
              { name: 'world', percent: 70 },
              { name: 'EM', percent: 30 }
            ]
          },
          {
            name: 'sustainable',
            percent: 20,
            categories: [],
            percentages: [{ name: 'ETF sustainable', percent: 100 }]
          },
          {
            name: 'commondities',
            percent: 10,
            categories: [],
            percentages: [{ name: 'ETF commodities', percent: 100 }]
          }
        ],
        percentages: []
      },
      {
        name: 'low risk',
        percent: 20,
        categories: [],
        percentages: [{ name: 'government bond', percent: 100 }]
      }
    ],
    percentages: [],
    percent: 100
  };
  it('creates the tree', async () => {
    const lastValue = await lastValueFrom(createCategoryTree(testData));
    expect(lastValue).toMatchSnapshot();
  });
  it('the leafes will still calculate the amount properly', async () => {
    const lastValue = await lastValueFrom(createCategoryTree(testData));
    expect(lastValue.categories[0].categories[0].amount).toEqual(560);
  });
});
