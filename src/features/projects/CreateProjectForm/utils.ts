import type { FieldErrors } from 'react-hook-form';

import type { FormParams } from './types';

export const mapServerErrorsToRHF = (
  fieldErrors: Record<keyof FormParams, string[]>
): FieldErrors<FormParams> => {
  const newObject = Object.entries(fieldErrors).map(([key, value]) => [
    key,
    { message: value[0], type: 'custom' },
  ]);
  return Object.fromEntries(newObject) as FieldErrors<FormParams>;
};
