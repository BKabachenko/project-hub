import { type LucideIcon } from 'lucide-react';

import { type ProjectType } from '@/generated/prisma';

export interface FeatureCardType {
  name: ProjectType;
  title: string;
  description: string;
  badgeTitle: string;
  badgeBg: string;
  icon: LucideIcon;
  iconColor: string;
  tags: readonly string[];
}
