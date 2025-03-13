import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema } from './schemas/schema';

// const data = {
//   name: 'Category',
//   percent: 12
// };

// type CompleteData = {
//   amount: number;
//   categories: Category[];
// };

// export const load = async () => {
//   const form = await superValidate(data, zod(categorySchema));

//   return { form };
// };
