import * as z from 'zod';
import { percentageSchema, type PercentageSchemaType } from './percentage';
import {
  mergeMap,
  forkJoin,
  from,
  map,
  Observable,
  of,
  tap,
  concatMap,
  mergeAll,
  catchError,
  throwError
} from 'rxjs';

const baseCategorySchema = z.object({
  name: z.string().min(2).max(50),
  percent: z.number().gte(1),
  amount: z.number().optional(),
  percentages: z.array(percentageSchema)
});

type CategoryType = z.infer<typeof baseCategorySchema> & {
  categories: CategoryType[];
};

export const categorySchema: z.ZodType<CategoryType> = baseCategorySchema.extend({
  categories: z.array(z.lazy(() => categorySchema))
});

class Category {
  constructor(
    public name: string,
    public percent: number,
    public categories: CategoryType[],
    public percentages: PercentageSchemaType[],
    private parent?: Category,
    /**
     * only the root element will get the amount injected
     */
    private _amount?: number
  ) {}

  get amount(): number {
    if (this.parent) {
      return this.parent.amount * (this.percent / 100);
    }
    if (this._amount == undefined) {
      throw new Error('amount is not defined in root category');
    }
    return this._amount;
  }
  toJSON(): CategoryType {
    return {
      name: this.name,
      percent: this.percent,
      categories: this.categories,
      percentages: this.percentages,
      amount: this._amount
    };
  }
}

export type CategorySchema = typeof categorySchema;

export type CategorySchemaType = z.infer<CategorySchema>;

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
  ]
};

export interface Folder {
  id: number;
  name: string;
  children: Folder[];
}

export interface ServerData {
  id: number;
  name: string;
  children: number[];
}

export const results: ServerData[] = [
  { id: 0, name: 'first', children: [1, 2, 3] },
  { id: 1, name: 'second', children: [4] },
  { id: 2, name: 'third', children: [] },
  { id: 3, name: 'fourth', children: [] },
  { id: 4, name: 'fifth', children: [] }
];

export function getFromServer(id: number): Observable<ServerData> {
  return of(results[id]);
}

export function getRecursive(id: number): Observable<Folder> {
  return getFromServer(id).pipe(
    map((data) => ({
      parent: { name: data.name, id: data.id, children: [] as Folder[] },
      childIds: data.children
    })),
    mergeMap((parentWithChildIds) =>
      forkJoin([
        of(parentWithChildIds.parent),
        ...parentWithChildIds.childIds.map((childId) => getRecursive(childId))
      ])
    ),
    tap(([parent, ...children]) => (parent.children = children)),
    map(([parent]) => parent)
  );
}

// getRecursive(0).subscribe((folder) => console.log(JSON.stringify(folder)));

function makeClass(category: CategorySchemaType, parent?: Category) {
  return new Category(
    category.name,
    category.percent,
    category.categories,
    category.percentages,
    parent,
    parent == undefined ? category.amount : undefined
  );
}

function recursiveStuff(data: CategorySchemaType, parent?: Category): Observable<Category> {
  console.log('run recursive stuff with', data);

  return of(data).pipe(
    // Transform the input data into a Category object
    map((currentData) => {
      console.log('making class for', currentData);
      return makeClass(currentData, parent);
    }),

    // Process subcategories recursively
    mergeMap((cat) => {
      console.log('processing cat:', cat.name, 'with subcategories:', cat.categories);

      if (cat.categories.length > 0) {
        // Recursively process all subcategories in parallel
        return forkJoin(cat.categories.map((newCat) => recursiveStuff(newCat, cat))).pipe(
          // Return the parent category with processed subcategories
          map((processedSubcategories) => {
            cat.categories = processedSubcategories;
            return cat;
          })
        );
      } else {
        // No subcategories, return the category as-is
        return of(cat);
      }
    }),

    // Log the result
    tap((result) => {
      console.log('processed category:', result);
    }),

    // Handle errors
    catchError((e) => {
      console.error('failed:', e);
      return throwError(() => new Error('Processing failed'));
    })
  );
}

console.log('subscribe');
recursiveStuff(testData).subscribe((res) => console.log('done', res));
