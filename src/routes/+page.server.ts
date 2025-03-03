import { superValidate } from 'sveltekit-superforms';
import { categorySchema } from './schemas/schema';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';

// export const load = async () => {
// 	return {
// 		form: await superValidate(zod(categorySchema))
// 	};
// };

// export const actions: Actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, zod(categorySchema));
// 		if (!form.valid) {
// 			return fail(400, {
// 				form
// 			});
// 		}
// 		return {
// 			form
// 		};
// 	}
// };
