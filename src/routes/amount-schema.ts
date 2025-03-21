import * as z from 'zod';

export const AmountSchema = z.object({
  amount: z.number().gt(0)
});
