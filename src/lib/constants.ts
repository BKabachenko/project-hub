import {
  MemberRole,
  MilestoneStatus,
  ProjectCategory,
  ProjectMemberStatus,
  ProjectStatus,
  ProjectType,
  UserStatus,
} from '@/generated/prisma';

export type ActionState<TData = undefined> =
  | { success: true; message?: string, data?: TData}
  | {
      success: false;
      message?: string;
      error?: string;
      fieldErrors?: Record<string, string[]>;
    };

export const initialState: ActionState = {
  success: false,
};

export const userStatusLabels = {
  [UserStatus.ACTIVE]: 'Active',
  [UserStatus.DELETED]: 'Deleted',
  [UserStatus.BANNED]: 'Banned',
} as const satisfies Record<UserStatus, string>;

export const memberRoleLabels = {
  [MemberRole.FRONTEND_DEVELOPER]: 'Frontend Developer',
  [MemberRole.BACKEND_DEVELOPER]: 'Backend Developer',
  [MemberRole.FULLSTACK_DEVELOPER]: 'Fullstack Developer',
  [MemberRole.PROJECT_MANAGER]: 'Project Manager',
  [MemberRole.UI_UX_DESIGNER]: 'UI/UX Designer',
  [MemberRole.QA_ENGINEER]: 'QA Engineer',
  [MemberRole.DEVOPS_ENGINEER]: 'DevOps Engineer',
  [MemberRole.BUSINESS_ANALYST]: 'Business Analyst',
  [MemberRole.DATA_SCIENTIST]: 'Data Scientist',
  [MemberRole.MARKETING_SPECIALIST]: 'Marketing Specialist',
  [MemberRole.OWNER]: 'Owner',
} as const satisfies Record<MemberRole, string>;

export const projectStatusLabels = {
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.FINISHED]: 'Finished',
  [ProjectStatus.CLOSED]: 'Closed',
} as const satisfies Record<ProjectStatus, string>;

export const projectCategoryLabels = {
  [ProjectCategory.E_COMMERCE]: 'E-commerce',
  [ProjectCategory.EDUCATION]: 'Education',
  [ProjectCategory.HEALTHCARE]: 'Healthcare',
  [ProjectCategory.FINANCE]: 'Finance',
  [ProjectCategory.SOCIAL_NETWORK]: 'Social Network',
  [ProjectCategory.PRODUCTIVITY]: 'Productivity',
  [ProjectCategory.ENTERTAINMENT]: 'Entertainment',
  [ProjectCategory.REAL_ESTATE]: 'Real Estate',
  [ProjectCategory.TRAVEL]: 'Travel',
  [ProjectCategory.FOOD_DELIVERY]: 'Food Delivery',
  [ProjectCategory.LOGISTICS]: 'Logistics',
  [ProjectCategory.SAAS]: 'SaaS',
  [ProjectCategory.ARTIFICIAL_INTELLIGENCE]: 'Artificial Intelligence',
  [ProjectCategory.BLOCKCHAIN]: 'Blockchain',
  [ProjectCategory.IOT]: 'IoT',
  [ProjectCategory.GAMING]: 'Gaming',
  [ProjectCategory.FITNESS]: 'Fitness',
  [ProjectCategory.MUSIC]: 'Music',
  [ProjectCategory.VIDEO]: 'Video',
  [ProjectCategory.NEWS]: 'News',
  [ProjectCategory.JOB_BOARD]: 'Job Board',
  [ProjectCategory.DATING]: 'Dating',
  [ProjectCategory.CROWDFUNDING]: 'Crowdfunding',
  [ProjectCategory.CRM]: 'CRM',
  [ProjectCategory.ERP]: 'ERP',
  [ProjectCategory.MARKETPLACE]: 'Marketplace',
  [ProjectCategory.STREAMING]: 'Streaming',
  [ProjectCategory.ANALYTICS]: 'Analytics',
  [ProjectCategory.CYBERSECURITY]: 'Cybersecurity',
  [ProjectCategory.AR_VR]: 'AR / VR',
} as const satisfies Record<ProjectCategory, string>;

export const projectTypeLabels = {
  [ProjectType.PET_PROJECT]: 'Pet Project',
  [ProjectType.COMMERCIAL]: 'Commercial',
  [ProjectType.OPEN_SOURCE]: 'Open Source',
  [ProjectType.CHARITY]: 'Charity',
} as const satisfies Record<ProjectType, string>;

export const milestonesStatusLabels = {
  [MilestoneStatus.COMPLETED]: 'Completed',
  [MilestoneStatus.IN_PROGRESS]: 'In progress',
  [MilestoneStatus.CANCELLED]: 'Canceled',
  [MilestoneStatus.PLANNED]: 'Planned',
} as const satisfies Record<MilestoneStatus, string>;
