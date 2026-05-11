import { MilestoneStatus, PrismaClient } from '@/generated/prisma';

const milestonesData = [
  {
    id: 'cmil1xyz000108l4a1b2c3d4',
    projectId: 'cproj1xyz000108l4a1b2c3d4',
    title: 'System Architecture and Database Schema',
    description:
      'Define the initial Prisma schema, setup PostgreSQL database, and configure Next.js boilerplate architecture.',
    status: MilestoneStatus.COMPLETED,
    order: 1,
    createdAt: new Date('2025-05-15T10:00:00Z'),
    updatedAt: new Date('2025-06-01T12:00:00Z'),
  },
  {
    id: 'cmil2xyz000208l4e5f6g7h8',
    projectId: 'cproj1xyz000108l4a1b2c3d4',
    title: 'Authentication and User Profiles',
    description:
      'Implement Auth.js for session management, create user profile pages, and handle avatar uploads.',
    status: MilestoneStatus.COMPLETED,
    order: 2,
    createdAt: new Date('2025-06-02T09:00:00Z'),
    updatedAt: new Date('2025-08-15T14:30:00Z'),
  },
  {
    id: 'cmil3xyz000308l4i9j0k1l2',
    projectId: 'cproj1xyz000108l4a1b2c3d4',
    title: 'Real-time Chat MVP',
    description:
      'Establish WebSocket connections and build the basic UI for team communication within project boards.',
    status: MilestoneStatus.IN_PROGRESS,
    order: 3,
    createdAt: new Date('2026-04-10T11:00:00Z'),
    updatedAt: new Date('2026-05-11T10:15:00Z'),
  },
  {
    id: 'cmil4xyz000408l4m3n4o5p6',
    projectId: 'cproj1xyz000108l4a1b2c3d4',
    title: 'GitHub API Integration',
    description:
      'Sync project repositories, display recent commits, and track contributor statistics directly on the platform.',
    status: MilestoneStatus.PLANNED,
    order: 4,
    createdAt: new Date('2026-05-01T08:00:00Z'),
    updatedAt: new Date('2026-05-01T08:00:00Z'),
  },
  {
    id: 'cmil5xyz000508l4q7r8s9t0',
    projectId: 'cproj1xyz000108l4a1b2c3d4',
    title: 'Public Beta Launch',
    description: null,
    status: MilestoneStatus.PLANNED,
    order: 5,
    createdAt: new Date('2026-05-01T08:30:00Z'),
    updatedAt: new Date('2026-05-01T08:30:00Z'),
  },
  {
    id: 'cmil6xyz000608l4u1v2w3x4',
    projectId: 'cproj2xyz000208l4e5f6g7h8',
    title: 'Core LMS Engine',
    description:
      'Develop the central course delivery system, lesson structuring, and secure video access control.',
    status: MilestoneStatus.COMPLETED,
    order: 1,
    createdAt: new Date('2025-06-25T10:00:00Z'),
    updatedAt: new Date('2025-11-20T16:00:00Z'),
  },
  {
    id: 'cmil7xyz000708l4y5z6a7b8',
    projectId: 'cproj2xyz000208l4e5f6g7h8',
    title: 'Custom Video Player Implementation',
    description:
      'Build a proprietary video player with DRM protection and interactive quiz overlays.',
    status: MilestoneStatus.CANCELLED,
    order: 2,
    createdAt: new Date('2025-11-21T09:00:00Z'),
    updatedAt: new Date('2026-01-15T11:20:00Z'),
  },
  {
    id: 'cmil8xyz000808l4c9d0e1f2',
    projectId: 'cproj2xyz000208l4e5f6g7h8',
    title: 'Third-Party Video Provider Integration',
    description:
      'Pivot from custom player to integrating AWS MediaConvert and secure signed URLs for video delivery.',
    status: MilestoneStatus.IN_PROGRESS,
    order: 3,
    createdAt: new Date('2026-01-20T10:30:00Z'),
    updatedAt: new Date('2026-05-05T14:10:00Z'),
  },
  {
    id: 'cmil9xyz000908l4g3h4i5j6',
    projectId: 'cproj2xyz000208l4e5f6g7h8',
    title: 'Payment Gateway and Subscriptions',
    description:
      'Integrate Stripe for handling monthly school subscriptions and student access tiers.',
    status: MilestoneStatus.PLANNED,
    order: 4,
    createdAt: new Date('2026-04-01T09:00:00Z'),
    updatedAt: new Date('2026-04-01T09:00:00Z'),
  },
  {
    id: 'cmil10xyz001008l4k7l8m9n0',
    projectId: 'cproj3xyz000308l4i9j0k1l2',
    title: 'Project Kickoff and Data Fetching',
    description: 'Initial repository setup and fetching public market data from CoinGecko API.',
    status: MilestoneStatus.COMPLETED,
    order: 1,
    createdAt: new Date('2024-12-05T08:00:00Z'),
    updatedAt: new Date('2024-12-20T17:00:00Z'),
  },
  {
    id: 'cmil11xyz001108l4o1p2q3r4',
    projectId: 'cproj3xyz000308l4i9j0k1l2',
    title: 'Data Visualization and Charts',
    description:
      'Implementing Recharts to display historical portfolio performance and asset allocation pie charts.',
    status: MilestoneStatus.COMPLETED,
    order: 2,
    createdAt: new Date('2025-01-10T10:00:00Z'),
    updatedAt: new Date('2025-02-15T12:00:00Z'),
  },
  {
    id: 'cmil12xyz001208l4s5t6u7v8',
    projectId: 'cproj3xyz000308l4i9j0k1l2',
    title: 'Export Functionality and Release',
    description:
      'Allow users to export their transaction history as CSV and deploy the application to Vercel.',
    status: MilestoneStatus.COMPLETED,
    order: 3,
    createdAt: new Date('2025-02-20T09:30:00Z'),
    updatedAt: new Date('2025-03-25T16:20:00Z'),
  },
  {
    id: 'cmil13xyz001308l4w9x0y1z2',
    projectId: 'cproj4xyz000408l4m3n4o5p6',
    title: 'Figma Prototyping',
    description: null,
    status: MilestoneStatus.COMPLETED,
    order: 1,
    createdAt: new Date('2026-05-09T09:30:00Z'),
    updatedAt: new Date('2026-05-10T18:00:00Z'),
  },
  {
    id: 'cmil14xyz001408l4a3b4c5d6',
    projectId: 'cproj4xyz000408l4m3n4o5p6',
    title: 'React Native Setup and Routing',
    description:
      'Initialize Expo project, configure React Navigation, and setup global state management.',
    status: MilestoneStatus.IN_PROGRESS,
    order: 2,
    createdAt: new Date('2026-05-11T09:00:00Z'),
    updatedAt: new Date('2026-05-11T14:00:00Z'),
  },
];

export async function seedMilestones(prisma: PrismaClient) {
  console.log('Starting Milestone seed...');

  for (const milestone of milestonesData) {
    await prisma.milestone.upsert({
      where: { id: milestone.id },
      update: {},
      create: milestone,
    });
  }

  console.log(`Successfully seeded ${milestonesData.length} milestones.`);
}
