import type { FormParams } from './types';

export const defaultRequirementsField: FormParams['requirements'][number] = {
  role: 'FRONTEND_DEVELOPER',
  requiredCount: 1,
  techStack: [],
};

export const defaultMilestonesField: NonNullable<FormParams['milestones']>[number] = {
  title: '',
  description: '',
  status: 'IN_PROGRESS',
  order: 0,
};

export const defaultFormValues: Partial<FormParams> = {
  title: '',
  description: '',
  gitUrl: '',
  type: [],
  milestones: [defaultMilestonesField],
  requirements: [defaultRequirementsField],
};
