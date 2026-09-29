import type z from 'zod';

import { type applyFormSchema } from './schemas';

export type ApplyFormParams = z.infer<typeof applyFormSchema>;
