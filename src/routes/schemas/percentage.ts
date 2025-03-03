import * as z from 'zod';

export const percentageSchema = z.object({
	name: z.string().min(2).max(50),
	percent: z.number().gte(1)
});

export type PercentageSchema = typeof percentageSchema;

export type PercentageSchemaType = z.infer<PercentageSchema>;
