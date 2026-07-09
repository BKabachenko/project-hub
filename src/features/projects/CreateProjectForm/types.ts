import type z from 'zod';

import type { formSchema } from './schema';

export type FormParams = z.infer<typeof formSchema>;
export type FormParamsInfer = z.infer<typeof formSchema>;
