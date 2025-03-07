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

export type CategoryType = z.infer<typeof baseCategorySchema> & {
  categories: CategoryType[];
};

export const categorySchema: z.ZodType<CategoryType> = baseCategorySchema.extend({
  categories: z.array(z.lazy(() => categorySchema))
});

export type CategorySchema = typeof categorySchema;

export type CategorySchemaType = z.infer<CategorySchema>;

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
