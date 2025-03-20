import { catchError, forkJoin, map, mergeMap, of, tap, throwError, type Observable } from 'rxjs';
import { Category } from './category.svelte';
import type { CategorySchemaType } from './schema';

export function createCategoryTree(
  data: CategorySchemaType,
  parent?: Category
): Observable<Category> {
  return of(data).pipe(
    // Transform the input data into a Category object
    map((currentData) => {
      return makeClass(currentData, parent);
    }),

    // Process subcategories recursively
    mergeMap((cat) => {
      if (cat.categories.length > 0) {
        // Recursively process all subcategories in parallel
        return forkJoin(cat.categories.map((newCat) => createCategoryTree(newCat, cat))).pipe(
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

    // Handle errors
    catchError((e) => {
      console.error('failed:', e);
      return throwError(() => new Error('Processing failed'));
    })
  );
}

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
