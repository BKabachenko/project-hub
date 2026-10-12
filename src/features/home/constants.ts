import { BriefcaseBusiness, Handshake, Rocket, Sprout } from 'lucide-react';

import { type FeatureCardType } from './types';

export const CARDS = [
  {
    name: 'PET_PROJECT',
    title: 'Study & Skill Up',
    description:
      'Join cohorts, peer code & design reviews, and build real portfolio work alongside helpful mentors.',
    badgeTitle: 'Growth',
    badgeBg: 'bg-pet-project/10',
    icon: Sprout,
    iconColor: 'text-pet-project',
    tags: ['Cohorts', 'Portfolio'],
  },
  {
    name: 'OPEN_SOURCE',
    title: 'Launch a Startup',
    description:
      'Meet aligned co-founders, validate MVPs quickly, and execute cross-functional 0-to-1 build sprints.',
    badgeTitle: 'Venture',
    badgeBg: 'bg-open-source/10',
    icon: Rocket,
    iconColor: 'text-open-source',
    tags: ['Equity', 'Co-Founders'],
  },
  {
    name: 'CHARITY',
    title: 'Social Good & Offline',
    description:
      'Empower non-profit tools, grassroots civic initiatives, environmental tech, and community relief efforts.',
    badgeTitle: 'Impact',
    badgeBg: 'bg-charity/10',
    icon: Handshake,
    iconColor: 'text-charity',
    tags: ['Civic', 'Open Access'],
  },
  {
    name: 'COMMERCIAL',
    title: 'Paid Sprints & Gigs',
    description:
      'Take on scoped, short-term contract milestones with verified teams and guaranteed project stipends.',
    badgeTitle: 'Contract',
    badgeBg: 'bg-commercial/10',
    icon: BriefcaseBusiness,
    iconColor: 'text-commercial',
    tags: ['Milestones', 'Stipends'],
  },
] satisfies FeatureCardType[];
