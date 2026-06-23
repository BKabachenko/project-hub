import { MemberRole, ProjectType, ProjectStatus } from "@/generated/prisma";
import z from 'zod';
import { toArray } from '@/lib/utils';


const urlParamToArray = <T extends z.ZodType>(schema: T) => z
  .union([z.string(), z.array(z.string()), z.undefined()])
  .optional()
  .catch(undefined)
  .transform((val) => toArray(val) as z.input<T>[] | undefined)
  .pipe(z.array(schema).min(1).optional().catch(undefined));

export const filterParamsSchema = z.object({
  query: z.union([z.string(), z.undefined()]).optional().catch(undefined),
  role: urlParamToArray(z.enum(MemberRole)),
  category: urlParamToArray(z.enum(ProjectType)),
  status: urlParamToArray(z.enum(ProjectStatus)),
});
