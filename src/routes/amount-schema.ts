import type { Infer, SuperValidated } from 'sveltekit-superforms';
import * as z from 'zod';

export const AmountSchema = z.object({
  amount: z.number().gt(0)
});

export type AmountFormData = SuperValidated<Infer<typeof AmountSchema>>;
