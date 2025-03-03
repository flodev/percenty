import * as z from 'zod';
import { categorySchema } from './schema';

export const percentySchema = categorySchema;

export type PercentySchema = typeof percentySchema;

export type PercentySchemaType = z.infer<PercentySchema>;

const testData: PercentySchemaType = {
  amount: 1000,
  name: 'root'
};
